import {
    CommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";
import {ErrorResponse, getQuote, getVotes, Vote, QuoteCollection} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("votes")
    .setDescription("List of my votes")

async function execute(interaction: CommandInteraction) {
    const userId = interaction.user.id
    const votesData = await getVotes(userId);
    let reply: string = "";

    if (votesData.status != 200) {
        const error = votesData.data as ErrorResponse
        return await interaction.reply(error.message)
    }

    const votes = votesData.data as Vote[]

    if (votes.length === 0) {
        return await interaction.reply({
            content: "No votes found"
        })
    }

    for (const vote of votes) {
        const quotes = (await getQuote(vote.quoteId)).data as QuoteCollection;

        reply += `*\"${quotes.quotes[0].text}\"* with **${quotes.quotes[0].votes.length} votes**\n`;
    }

    if (reply.length === 0) {
        return await interaction.reply({
            content: "No votes found"
        })
    }

    return await interaction.reply({
        content: reply
    })
}

export default {
    data,
    execute,
}
