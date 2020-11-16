const {MessageEmbed} = require("discord.js");
const {VultrexDB} = require("vultrex.db");
const messageData = new VultrexDB({
    name: "messages"
});

console.log("Got here!")

module.exports.run = (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    // const messages = messageData.get(`${message.guild.id}-${member.id}`, 0);

    // message.channel.send(new MessageEmbed()
    //     .setColor("RED")
    //     .setAuthor(`Data | ${member.user.username}`, member.user.displayAvatarURL())
    //     .addField("Messages Sent:", messages, true)
    //     );
}

module.exports.help = {
    name: "messages",
    description: "view the amount of messages sent by a member"
}

module.exports.requirements = {
    clientPerms: ["EMBED_LINKS"],
    userPerms: [],
    ownerOnly: false,
}