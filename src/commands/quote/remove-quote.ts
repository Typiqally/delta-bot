import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {deleteQuote} from "../../service/quote-service"


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

    if (quoteId) {
        const response = await deleteQuote(parseInt(quoteId));
        if (response.status == 200) {
            return await interaction.reply("Successfully removed from the wall!")
        }
    }
}

export default {
    data,
    execute
}
