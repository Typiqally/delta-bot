import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {getQuotes} from "../../service/quote-service";

export interface Quote {
    id: number
    text: string
    discordId: string
    createdAt: string
    updatedAt: string
    votes: []
}

const data = new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("List of quotes")
    .addUserOption(option =>
        option.setName("author")
            .setRequired(false)
            .setDescription("The author of the quote"))

async function execute(interaction: CommandInteraction) {
    const allQuotes = await getQuotes();

    if (typeof allQuotes === 'object') {
        const response = allQuotes.slice(0, 20).map(quote =>
            `*\"${quote.text}\"* with **${quote.votes.length} votes**`
        ).join("\n")

        return interaction.reply(response);
    }

    return interaction.reply(allQuotes);
}

export default {
    data,
    execute,
    getQuotes
}
