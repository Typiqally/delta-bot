import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {deleteQuote} from "../../service/quote-service"


// Slash command for the removal of quotes
const data = new SlashCommandSubcommandBuilder()
    .setName('remove')
    .setDescription('remove a quote for the wall')
    .addStringOption(option =>
        option
            .setName('quote')
            .setDescription('quote to remove')
            .setRequired(true)
            .setAutocomplete(true));

async function execute(interaction: CommandInteraction) {
    console.log(interaction)
    const rmQuote = interaction.options.get('quote')?.value as string | undefined;
    console.log(`user input: ${rmQuote}`)

    if (rmQuote) {
        const reply = await deleteQuote(parseInt(rmQuote));
        return interaction.reply(reply)
    }

    return interaction.reply("Something went wrong. Please contact Delta+")
}

export default {
    data,
    execute
}
