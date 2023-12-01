import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";
import {createQuote, ErrorResponse} from "../../service/quote-service";

const data = new SlashCommandSubcommandBuilder()
    .setName("create")
    .addStringOption(option =>
        option.setName("quote")
            .setDescription("Quote to add to the wall")
            .setRequired(true)
            .setMinLength(3)
            .setMaxLength(99))
    .setDescription("creates a new quote for the wall");

async function execute(interaction: CommandInteraction) {
    const quote: string = interaction.options.get("quote")!.value as string;
    const userId: string = interaction.user.id;

    if (quote.length > 100) {
        return await interaction.reply("Quote should be less than 100 words");
    }

    const response = await createQuote(userId, quote);
    if (response.status == 201) {
        return await interaction.reply("Successfully created quote on the wall, you should see it appear soon.");
    }

    const error = response.data as ErrorResponse
    return await interaction.reply(error.message);
}

export default {
    data,
    execute
}
