const {token, prefix} = require("./config");
const {Client, Collection } = require("discord.js")
const {VultrexDB} = require("vultrex.db");

const client = new Client({
    disableEverone: true,
    disabledEvents: ["TYPING_START"]
});

// const db = new VultrexDB({
//     provider: "sqlite",
//     table: "main",
//     fileName: "discordBot"

// })

// db.connect().then(() => {

// })

client.commands = new Collection();
client.limits = new Map();
client.snipe = new Map();
client.prefix = prefix
// client.prefix = new Object();
// client.prefix["default"] = prefix;
// client.db = db;

const commands = require("./structures/command");
commands.run(client);

const events = require("./structures/event");
events.run(client);

client.login(token);
