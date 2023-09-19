import {config} from "./config";
import {Client, Events, GatewayIntentBits, Snowflake} from "discord.js";
import {commands} from "./commands";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ]
})

client.once(Events.ClientReady, async client => {
    console.log(`Logged in as ${client.user.tag}`);

    await client.application.commands.set(commands.map(a => a.data))
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const {commandName} = interaction;
    const command = commands.find(c => c.data.name == commandName)

    if (command) {
        await command.execute(interaction);
    }
});

client.login(config.TOKEN)