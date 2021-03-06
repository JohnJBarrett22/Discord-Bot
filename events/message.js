const {owners} = require("../config");
// const {VultrexDB} = require("vultrex.db");
// const messageData = new VultrexDB({
//     name: "messages"
// });

module.exports = (client, message) => {
    // let messages = messageData.get(`${message.guild.id}-${message.author.id}`, 0);
    // messages++;
    // messageData.set(`${message.guild.id}-${message.author.id}`, messages);

    if(!message.guild || message.author.bot) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix.length).toLowerCase();
    const cmd = client.commands.get(command);

    if(!message.content.toLowerCase().startsWith(client.prefix)) return;

    if(!cmd) return;
    if(!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;

    if(cmd.requirements.ownerOnly && !owners.includes(message.author.id)) 
        return message.reply("Only the bot owner can use this command!");

    if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`You must have the following permissions: ${missingPerms(message.member, cmd.requirements.userPerms)}`);

    if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`I am missing the following permissions: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);

    if(cmd.limits) {
        const current = client.limits.get(`${command}-${message.author.id}`);

        if(!current) client.limits.set(`${command}-${message.author.id}`, 1);
        else {
            if(current >= cmd.limits.rateLimit) return;
            client.limits.set(`${command}-${message.author.id}`, current + 1);
        }
        setTimeout(() => {
            client.limits.delete(`${command}-${message.author.id}`)
        }, cmd.limits.cooldown);
    }

    cmd.run(client, message, args);

}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms).map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
    missingPerms[0];
}