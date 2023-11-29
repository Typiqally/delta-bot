import {config} from "./config";
import {AutocompleteInteraction, Client, Events, GatewayIntentBits, Snowflake, CommandInteraction, SlashCommandBuilder} from "discord.js";
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

client.on("interaction", async (interaction: AutocompleteInteraction) => {
    if (!interaction.isAutocomplete()) { return; }
    if (interaction.commandName !== 'remove-quote') { return; }
   
    const focusedValue: string = interaction.options.getFocused();
    console.log(focusedValue);

})

client.login(config.TOKEN)