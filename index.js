const {token, prefix} = require("./config");
const {Client, Collection } = require("discord.js")

const client = new Client({
    disableEverone: true,
    disabledEvents: ["TYPING_START"]
});

client.prefix = prefix;
client.commands = new Collection();
client.limits = new Map();
client.snipe = new Map();

const commands = require("./structures/command");
commands.run(client);

const events = require("./structures/event");
events.run(client);

client.login(token);
