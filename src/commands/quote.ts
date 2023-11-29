import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {quoteCommands} from "./quote/index";

const data = new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Create quotes");

quoteCommands.forEach(c => data.addSubcommand(c.data))

async function execute(interaction: CommandInteraction) {
    const subCommandName = interaction.options.getSubcommand()
    const command = quoteCommands.find(c => c.data.name == subCommandName)

    if (command) {
        return await command.execute(interaction);
    }
}

export default {
    data,
    execute
}
