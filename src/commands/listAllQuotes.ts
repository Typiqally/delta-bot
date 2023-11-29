import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const url: string = config.API_SERVER;
var quotes: string = "";
export interface Response {
  id: number
  text: string
  author: string
  createdAt: string
  updatedAt: string
} 

export const getAllQuotes = async () => {
try {
    const response = await axios.get(url);
    console.log('Successfully recieved all quotes');
    return response.data as Response[]; 
  } catch (error) {
    console.error('Error recieving all the quotes from API:', error);
    return "Something went wrong. Please contact Delta+"
  }
};

export const data = new SlashCommandBuilder()
    .setName("list-all-quotes")
    .setDescription("List all posted quotes");

    export async function execute(interaction: CommandInteraction) {
      const allQuotes = await getAllQuotes();

      if (typeof allQuotes === 'object') {
        for (const quote of allQuotes) {
          quotes += quote.text + "\n";
        }
        return interaction.reply(quotes);
      }
      return interaction.reply(allQuotes);
    }