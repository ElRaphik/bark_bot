// my requires
const config = require('./config.json')

// other requires
const Discord = require("discord.js");

// discord client setup
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});


const prefix = "$!";
let role_id = config.bark_role;


// requests
Client.on("ready", () => {
    console.log("Let's bark :smirk:");
});

Client.login(config.token).then(() => {
    console.log("Barking machine is logged in :yay:")
});


Client.on("messageCreate", message => {
    if(message.author.bot || message.system) return;

    // TODO 01: do commands
    if(message.content.startsWith(prefix)) {
        const message_content = message.content.trim().split(' ');
        const command = message_content[0].slice(prefix.length);

        switch (command) {
            case "ping":
                message.reply("bark").then();
                break;
            case "help":
                message.reply("This is the help of barkbot\n Bark bark!").then();
                break;
            case "chrid":
                if(message.author.id === config.master_id)
                    role_id = message_content[1];
                break;
            default:
                message.reply(`The command ${command} does not exit (yet ?), bark!`).then();
        }
        return;
    }

    if(message.member.roles.cache.some(role => role.id === role_id)) {
        const message_content = message.content.trim().split(' ');
        let new_msg = "";

        for (const string of message_content) {
            new_msg += ` bark`;
        }

        new_msg = `${message.member.nickname === null ? message.member.displayName : message.member.nickname} voulait dire :\n${new_msg.trim()}`

        message.channel.send(new_msg).then(() => message.delete());
    }
});


















