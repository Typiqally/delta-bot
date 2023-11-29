import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {createQuote} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("create")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("quote to project")
            .setRequired(true))
    .setDescription("creates a new quote for the wall");

async function execute(interaction: CommandInteraction) {
    const quote: string = interaction.options.get("quote")!.value as string;
    const userId: string = interaction.user.id;
    const reply: string = await createQuote(userId, quote);

    return interaction.reply(reply);
}

export default {
    data,
    execute
}
