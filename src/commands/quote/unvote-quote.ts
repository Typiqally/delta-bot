import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {unVoteQuote} from "../../service/quote-service";

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

    if (unVote) {
        const reply = await unVoteQuote(parseInt(unVote), discordId);
        if (reply.status == 200) {
            return await interaction.reply("Successfully removed vote from quote.")
        }
    }
}

export default {
    data,
    execute
}
