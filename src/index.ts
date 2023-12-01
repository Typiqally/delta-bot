import {config} from "./config";
import {
    Client,
    Events,
    GatewayIntentBits
} from "discord.js";
import {commands} from "./commands";
import {getAllQuotes, getPageQuotes} from "./service/quote-service";
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
            console.log("autocompleting")
            // if ((interaction.commandName !== 'quote' || interaction.options.getSubcommand() !== 'remove' ) || (interaction.options.getSubcommand() !== 'vote'||interaction.options.getSubcommand() !== 'unvote')) {
            //     return;
            // }

            const focusedValue = interaction.options.getFocused();
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


        if (interaction.isButton()){
            const firstPage = await getPageQuotes(0);
            const pageCount = Math.ceil(firstPage.total_count / 10);

            if (interaction.customId === 'next-page'){
                currentPageNum++
                if (currentPageNum === pageCount) {
                    next.setDisabled(true);
                } else{
                    next.setDisabled(false);
                }
            }
            if (interaction.customId === 'previous-page'){
                currentPageNum--
                if (currentPageNum === 0) {
                    previous.setDisabled(true);
                } else{
                    previous.setDisabled(false);
                }


            }
            const currentPage = await getPageQuotes(currentPageNum)

            if (typeof currentPage.quotes === 'object') {
                let response = currentPage.quotes.slice(0,20).map(quote =>
                    `*\"${quote.text}\"* with **${quote.votes.length} votes**`
                ).join("\n")

                const messageObject = {
                    content: response,
                    components: [row]
                }

                await  interaction.reply(messageObject)
            }

            await interaction.reply("2Something went wrong. Please contact Delta+")
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
