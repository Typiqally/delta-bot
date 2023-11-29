import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {getAllQuotes, type Response} from "./listAllQuotes";


const url: string = config.API_SERVER;

// array for all the quotes
var quotes: string[];

// Id that's attached to the soon to be removed quote
let rmID: number;

// sends DELETE http request to API
const removeQuote = async (quoteID: number, quote: string, userID: number) => {
    try {
      const response = await axios.delete(url, {
        data: {
          id: quoteID
        }
      });
      console.log(
        'Successfully deleted quote from API' +
        '\nuserID: ' + userID +
        "\nquote: " + quote +
        "\nID: " + quoteID +
        "\nHTTP-response: " + response
      );
      return "Successfully removed from the Wall!";
    } catch (error) {
      console.error('Error could not delete quote: ', error);
      return "Something went wrong. Please contact Delta+";
    }
  };
  
 
    // Slash command for the removal of quotes
export const data = new SlashCommandBuilder()
    .setName('remove-quote')
    .setDescription('remove a quote for the wall')
    .addStringOption(option =>
        option
            .setName('quote')
            .setDescription('quote to remove')
            .setRequired(true)
            .setAutocomplete(true));
      
        
    export async function execute(interaction: CommandInteraction) {
        const rmQuote: string = interaction.options.get('quote')!.value as string;
        const userID: number = +interaction.user.id;
        const allQuotes = await getAllQuotes();
    
        if (typeof allQuotes === 'object') {
            for (let i = 0; i < allQuotes.length; i++) {
            if (allQuotes[i].text === rmQuote) {
                rmID = allQuotes[i].id;
                break;
            }
            }
            const reply: string = await removeQuote(rmID, rmQuote, userID);
            return interaction.reply(reply);
        }
    };
    
  