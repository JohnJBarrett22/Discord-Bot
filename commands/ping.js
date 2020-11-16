module.exports.run = (client, message, args) => {
    message.reply(`Pong! ${client.ws.ping.toFixed(2)}ms`)
}

 module.exports.help = {
     name: "ping",
     description: "a simple ping command"
 }

 module.exports.requirements = {
     userPermms: [],
     clientPerms: [],
     ownerOnly: false,
 }

 module.exports.limits = {
     rateLimit: 2,
     cooldown: 1e4
 }