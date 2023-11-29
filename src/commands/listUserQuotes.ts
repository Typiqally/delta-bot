import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {getAllQuotes, type Response} from "./listAllQuotes";

var quotes: string = "";

export const data = new SlashCommandBuilder()
    .setName("list-my-qoutes")
    .setDescription("list my posted quotes");

export async function execute(interaction: CommandInteraction) {
    const discordId: string = interaction.user.id;
    const allQuotes = await getAllQuotes();
    if (typeof allQuotes === 'object') {
        for (let i = 0; i < allQuotes.length; i++) {
            if (allQuotes[i].discordId == discordId) {
                quotes += `${allQuotes[i].text}\n`;
            }
        }

        return interaction.reply(quotes);
    }

    return interaction.reply(allQuotes);

}