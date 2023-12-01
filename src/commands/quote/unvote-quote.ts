import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {unvoteQuote} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("unvote")
    .setDescription("unvote to a quote")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("quote to unvote")
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    const unvote = interaction.options.get('quote')?.value as string | undefined;
    const discordId = interaction.user.id;
    console.log(`user input: ${unvote}`)

    if (unvote) {
        const reply = await unvoteQuote(parseInt(unvote), discordId);
        return interaction.reply(reply)
    }

    return interaction.reply("Something went wrong. Please contact Delta+")

}
export default {
    data,
    execute
}