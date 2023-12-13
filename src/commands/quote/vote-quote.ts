import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {ErrorResponse, voteQuote} from "../../service/quote-service";
import {AxiosError} from "axios";

const data = new SlashCommandSubcommandBuilder()
    .setName("vote")
    .setDescription("Vote on a quote")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("Quote to vote")
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    const quote = interaction.options.get('quote')?.value as string | undefined;
    const discordId = interaction.user.id;

    if (!quote) {
        return;
    }

    voteQuote(parseInt(quote), discordId)
        .then(async () => {
            await interaction.reply("Successfully voted for quote.")
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
    execute
}
