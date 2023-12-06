import {
    CommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";
import {ErrorResponse, getQuotes, QuoteCollection} from "../../service/quote-service";
import {AxiosError} from "axios";


const data = new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("List of quotes")
    .addIntegerOption(option =>
        option.setName("page")
            .setMinValue(0)
            .setRequired(false)
            .setDescription("Page number"))
    .addUserOption(option =>
        option.setName("author")
            .setRequired(false)
            .setDescription("The author of the quote"))

async function execute(interaction: CommandInteraction) {
    const pageNumber = interaction.options.get("page")?.value as number | undefined;
    const authorId = interaction.options.get("author")?.value as string | undefined;

    getQuotes(pageNumber ?? 0, authorId)
        .then(async (response) => {
            const collection = response.data as QuoteCollection

            if (collection.quotes.length == 0) {
                return await interaction.reply({
                    content: "No quotes found"
                })
            }

            const reply = collection.quotes.slice(0, 20).map(quote =>
                `*\"${quote.text}\"* with **${quote.votes.length} votes**`
            ).join("\n")

            return await interaction.reply({
                content: reply
            });
        })
        .catch(async (error: AxiosError) => {
            if (error.response) {
                const errorMessage = error.response.data as ErrorResponse
                await interaction.reply(errorMessage.message)
            }
        })
}

export default {
    data,
    execute,
}
