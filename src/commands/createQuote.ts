import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const url: string = config.API_SERVER;

const sendQuote = async (discordId: string, quote: string) => {
    try {
      const response = await axios.post(url, {
        text:quote,
        discordId:discordId,
      });
  
      console.log('Successfully sent quote');
      return "Successfully sent to the Wall!"
    } catch (error) {
      console.error('Error sending username and quote to API:', error);
      return "Something went wrong. Please contact Delta+"
    }
  };


export const data = new SlashCommandBuilder()
    .setName("new-quote")
    .addStringOption(option => option.setName("quote").setDescription("quote to project").setRequired(true))
    .setDescription("creates a new quote for the wall");

    export async function execute(interaction: CommandInteraction) {
        const quote: string = interaction.options.get("quote")!.value as string;
        const userId: string = interaction.user.id;
        const reply: string = await sendQuote(userId, quote);
        
        return interaction.reply(reply);
    }