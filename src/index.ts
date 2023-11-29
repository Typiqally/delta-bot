import {config} from "./config";
import {getAllQuotes, type Response} from "./commands/listAllQuotes";
import {
    AutocompleteInteraction,
    Client,
    Events,
    GatewayIntentBits,
    Snowflake,
    CommandInteraction,
    SlashCommandBuilder
} from "discord.js";
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
        if (interaction.isAutocomplete()) {
            if (interaction.commandName !== 'remove-quote') {

                return;
            }

            const focusedValue = interaction.options.getFocused();
            console.log(focusedValue);
            const quotes = await getAllQuotes();
            if (typeof quotes != 'object') {
                return;

            } else {
                const filterChoices = quotes.filter((quote) =>
                    quote.text.toLowerCase().startsWith(focusedValue.toLowerCase())
                )
                const results = filterChoices.map((choice) => {
                    return {
                        name: choice.text,
                        value: choice.id.toString()
                    };
                });

                interaction.respond(results.slice(0, 25))
            }
        }

        if (interaction.isCommand()) {

            const {commandName} = interaction;
            const command = commands.find(c => c.data.name == commandName)

            if (command) {
                await command.execute(interaction);
            }
        }
    }
)


client.login(config.TOKEN)