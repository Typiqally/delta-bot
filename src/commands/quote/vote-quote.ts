import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {deleteQuote, voteQuote} from "../../service/quote-service";

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

    if (quote) {
        const reply = await voteQuote(parseInt(quote), discordId);
        if (reply.status == 200) {
            return await interaction.reply("Successfully voted for quote.")
        }
    }
}

export default {
    data,
    execute
}
