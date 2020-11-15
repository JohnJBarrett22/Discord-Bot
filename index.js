const {token, prefix} = require("./config");
const {Client, Collection } = require("discord.js")

const Client = new Client({
    disableEverone: true,
    shardCount: "auto",
    disabledEvents: ["TYPING_START"]
});

client.prefix = prefix;
client.commands = new Collection();

const commands = require("./structures/command");
commands.run(client);

const events = require("./structures/event");
events.run(client);

client.login(token);
