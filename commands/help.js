const {MessageEmbed, MessageFlags} = require("discord.js");

module.exports.run = (client, message, args) => {
    if(args[0] && client.commands.has(args[0])){
        const cmd = client.commands.get(args[0])
        const embed = new MessageEmbed()
            .setAuthor(`${cmd.help.name} | Help`, client.user.displayAvatarURL())
            .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`)
            .setColor(0xffffff)

        return message.channel.send(embed);
    }

    const embed = new MessageEmbed()
        .setAuthor(`Help | ${client.user.username}`, client.user.displayAvatarURL())
        .setDescription(clients.commands.map(cmd => cmd.help.name).join(", "))
        .setColor(0xffffff)

    message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    description: "View available commands"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 3,
    cooldown: 6e4
}