import {
    CommandInteraction,
    SlashCommandSubcommandBuilder
} from "discord.js";
import {getAuthorQuotes, getPageQuotes} from "../../service/quote-service";
import {previous, row} from "../../service/quote-buttons"


const data = new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("List of quotes")
    .addIntegerOption(option =>
        option.setName("page")
            .setMinValue(0)
            .setRequired(false))
    .addUserOption(option =>
        option.setName("author")
            .setRequired(false)
            .setDescription("The author of the quote"))

async function execute(interaction: CommandInteraction) {
    const pageNumber = interaction.options.get("page")?.value as number | undefined;
    const authorId = interaction.options.get("author")?.value as string | undefined;


    if (authorId) {
        const authorQuotes = await getAuthorQuotes(authorId);

        if (typeof authorQuotes === 'object') {
            let response = authorQuotes.quotes.slice(0, 20).map(quote =>
                `*\"${quote.text}\"* with **${quote.votes.length} votes**`
            ).join("\n")
            await interaction.reply(response);
        }
    } else {
        const page = await getPageQuotes(pageNumber ?? 0);

        if (typeof page === 'object') {
            let response = page.quotes.slice(0, 20).map(quote =>
                `*\"${quote.text}\"* with **${quote.votes.length} votes**`
            ).join("\n")

            previous.setDisabled(true);

            await interaction.reply({
                content: response,
                components: [row]
            });
        }

        //return await interaction.reply();
        return interaction.reply('1Something went wrong. Please contact Delta+')
    }
}

export default {
    data,
    execute,
}
