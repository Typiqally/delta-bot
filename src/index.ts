import {config} from "./config";
import {
    Client,
    Events,
    GatewayIntentBits
} from "discord.js";
import {commands} from "./commands";
import {getAllQuotes, getPageQuotes, QuoteCollection} from "./service/quote-service";
import {previous, next, row} from "./service/quote-buttons"

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

let currentPageNum: number = 0
client.on("interactionCreate", async (interaction) => {
        if (interaction.isAutocomplete()) {
            const focusedValue = interaction.options.getFocused();
            const quotes = await getAllQuotes();

            if (typeof quotes !== 'object') {
                return;
            }

            const filterChoices = quotes.quotes.filter((quote) =>
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


        if (interaction.isButton()) {
            const firstPage = await getPageQuotes(0) as QuoteCollection;
            const pageCount = Math.ceil(firstPage.total_count / 10);

            if (interaction.customId === 'next-page') {
                currentPageNum++
                next.setDisabled(currentPageNum === pageCount);
            }

            if (interaction.customId === 'previous-page') {
                currentPageNum--
                previous.setDisabled(currentPageNum === 0);
            }

            const currentPage = await getPageQuotes(currentPageNum) as QuoteCollection;

            if (typeof currentPage.quotes === 'object') {
                let response = currentPage.quotes.slice(0, 20).map(quote =>
                    `*\"${quote.text}\"* with **${quote.votes.length} votes**`
                ).join("\n")

                await interaction.reply({
                    content: response,
                    components: [row]
                })
            }

            await interaction.reply("Something went wrong. Please contact Delta+")
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
