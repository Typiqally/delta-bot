import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const url: string = config.API_SERVER + config.API_CREATE_PATH;

const sendQuote = async (username: string, quote: string) => {
    try {
      const response = await axios.post(url, {
        username,
        quote,
      });
  
      console.log('Successfully sent username and quote to API: '+ response);
      return "Successfully sent to the Wall!"
    } catch (error) {
      console.error('Error sending username and quote to API:', error);
      return "Something went wrong. Please contact Delta+"
    }
  };


export const data = new SlashCommandBuilder()
    .setName("QuoteWall/New-Qoute")
    .addChannelOption(option => option.setName("quote").setDescription("quote to project").setRequired(true))
    .setDescription("Creates a new quote for the wall");

    export async function execute(interaction: CommandInteraction) {
        const quote: string = interaction.options.get("quote")!.value as string;
        const user: string = interaction.user.username;
        const reply: string = await sendQuote(user, quote);
        
        return interaction.reply(reply);
    }