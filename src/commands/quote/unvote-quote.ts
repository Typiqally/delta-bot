import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {ErrorResponse, unVoteQuote} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("unvote")
    .setDescription("Remove a vote from a quote")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("quote to unvote")
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    const unVote = interaction.options.get('quote')?.value as string | undefined;
    const discordId = interaction.user.id;

    if (!unVote) {
        return;
    }

    unVoteQuote(parseInt(unVote), discordId)
        .then(async (response) => {
            return await interaction.reply("Successfully removed vote from quote.")
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
