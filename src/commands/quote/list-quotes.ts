import {
    ActionRow,
    ActionRowBuilder,
    ButtonBuilder,
    CommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";
import {getAllQuotes, getAuthorQuotes, getPageQuotes} from "../../service/quote-service";
import {previous, next, row} from "../../service/quote-buttons"

export interface Quote {
    total_count: number
    quotes: {
        id: number
        text: string
        discordId: string
        createdAt: string
        updatedAt: string
        votes: []
    }
}


const data = new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("List of quotes")
    .addUserOption(option =>
        option.setName("author")
            .setRequired(false)
            .setDescription("The author of the quote"))

async function execute(interaction: CommandInteraction) {
    const authorId = interaction.options.get("author")?.value as string | undefined;
    if (authorId) {
        const authorQuotes = getAuthorQuotes(authorId);
        if (typeof authorQuotes.quotes === 'object') {
            let response = authorQuotes.quotes.slice(0, 20).map(quote =>
                `*\"${quote.text}\"* with **${quote.votes.length} votes**`
            ).join("\n")
            await interaction.reply(response);
        }
    } else {

        const firstPage = await getPageQuotes(0);
        if (typeof firstPage.quotes === 'object') {
            let response = firstPage.quotes.slice(0, 20).map(quote =>
                `*\"${quote.text}\"* with **${quote.votes.length} votes**`
            ).join("\n")
            previous.setDisabled(true);
            let firstMessageObject = {
                content: response,
                components: [row]
            }
            await interaction.reply(firstMessageObject);
        }

        //return await interaction.reply();
        return interaction.reply('1Something went wrong. Please contact Delta+')
    }
}

export default {
    data,
    execute,
}
