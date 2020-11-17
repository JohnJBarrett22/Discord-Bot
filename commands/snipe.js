const{MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
    const msg = client.snipe.get(message.channel.id);
    if(!msg) return message.reply("No recently deleted messages!")

    const embed = new MessageEmbed()
    .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
    .setDescription(msg.content);

    if(msg.image) embed.setImage(msg.image)

    message.channel.send(embed)
}

module.exports.help = {
    name: "snipe",
    description: "View a recently deleted message"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: [],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 3,
    cooldown: 6e4
}