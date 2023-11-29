import axios from 'axios';
import {config} from "../../config";
import {CommandInteraction, SlashCommandSubcommandBuilder} from "discord.js";

const url: string = config.API_SERVER;
var quotes: string = "";

export interface Response {
    id: number
    text: string
    discordId: string
    createdAt: string
    updatedAt: string
    votes: []
}

export const getQuotes = async () => {
    try {
        const response = await axios.get(url);
        console.log('Successfully received all quotes');

        return response.data as Response[];
    } catch (error) {
        console.error('Error received all the quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

export const data = new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("List of quotes")
    .addUserOption(option =>
        option.setName("author")
            .setRequired(false)
            .setDescription("The author of the quote"))

export async function execute(interaction: CommandInteraction) {
    const allQuotes = await getQuotes();

    if (typeof allQuotes === 'object') {
        for (const quote of allQuotes) {
            quotes += `*\"${quote.text}\"* with **${quote.votes.length} votes**\n`;
        }

        return interaction.reply(quotes);
    }

    return interaction.reply(allQuotes);
}

export default {
    data,
    execute,
    getQuotes
}
