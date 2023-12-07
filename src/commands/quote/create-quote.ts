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

    createQuote(userId, quote)
        .then(async (response) => {
            return await interaction.reply("Successfully created quote on the wall, you should see it appear soon.");
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
