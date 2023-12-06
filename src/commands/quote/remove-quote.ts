import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {deleteQuote, ErrorResponse} from "../../service/quote-service"


// Slash command for the removal of quotes
const data = new SlashCommandSubcommandBuilder()
    .setName('remove')
    .setDescription('Remove a quote from the wall')
    .addStringOption(option =>
        option
            .setName('quote')
            .setDescription('Quote to remove')
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    const quoteId = interaction.options.get('quote')?.value as string | undefined;

    if (!quoteId) {
        return;
    }

    deleteQuote(parseInt(quoteId))
        .then(async (response) => {
            return await interaction.reply("Successfully removed from the wall!")
        })
        .catch(async (error) => {
            if (error.response) {
                const errorMessage = error.response.data as ErrorResponse
                await interaction.reply(errorMessage.message)
            }
        })
}

export default {
    data,
    execute
}
