import {config} from "./config";
import {
    Client,
    Events,
    GatewayIntentBits
} from "discord.js";
import {commands} from "./commands";
import {getQuotes, QuoteCollection} from "./service/quote-service";

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
        try {
            if (interaction.isAutocomplete()) {
                const focusedValue = interaction.options.getFocused();
                const response = await getQuotes();

                if (response.status != 200) {
                    return
                }

                const collection = response.data as QuoteCollection
                const results = collection.quotes.filter((quote) => quote.text.toLowerCase().startsWith(focusedValue.toLowerCase()))
                    .map((choice) => ({
                        name: choice.text,
                        value: choice.id.toString()
                    }));

                await interaction.respond(results.slice(0, 25))
            } else if (interaction.isCommand()) {
                const {commandName} = interaction;
                const command = commands.find(c => c.data.name == commandName)

                if (command) {
                    await command.execute(interaction);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
)


client.login(config.TOKEN)
