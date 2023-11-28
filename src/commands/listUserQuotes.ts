import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const url: string = config.API_SERVER + config.API_LIST_PATH;
var quotes: string;
interface Response {
    id: number
    username: string
    quote: string
} 

const getMyQuotes = async (username: string) => {
  try {
        const response = await axios.get(url, 
            {params: {username: username,}}
        );
        console.log(username +' : Successfully recieved all quotes');
        return response.data as Response[]; 
    } catch (error) {
        console.error('Error recieving all the quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
  };

export const data = new SlashCommandBuilder()
    .setName("QuoteWall/List-My-Qoutes")
    .setDescription("List my posted quotes");

    export async function execute(interaction: CommandInteraction) {
        const user: string = interaction.user.username;
        const allQuotes = await getMyQuotes(user);

        if (typeof allQuotes === 'object') {
            for (const quote of allQuotes) {
            quotes += "'" + quote.quote + "' - " + quote.username + "\n";
            }
        return interaction.reply(quotes);
        }
        return interaction.reply(allQuotes);
    }