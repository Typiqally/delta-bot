import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {deleteQuote, voteQuote} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("vote")
    .setDescription("gives one vote to a quote")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("quote to vote")
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    const vote = interaction.options.get('quote')?.value as string | undefined;
    const discordId = interaction.user.id;
    console.log(`user input: ${vote}`)

    if (vote) {
        const reply = await voteQuote(parseInt(vote), discordId);
        return interaction.reply(reply)
    }

    return interaction.reply("Something went wrong. Please contact Delta+")

}
export default {
    data,
    execute
}