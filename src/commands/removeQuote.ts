import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

const removeUrl: string = config.API_SERVER + config.API_REMOVE_PATH;
const listUrl: string = config.API_SERVER + config.API_LIST_PATH;

// array for all the quotes
var quotes: string[];

// Id that's attached to the soon to be removed quote
let rmID: number;
// interface for all the quotes
interface Response {
  id: number
  username: string
  quote: string
} 

// sends DELETE http request to API
const removeQuote = async (quoteID: number, quote: string, username: string) => {
    try {
        const url :string = removeUrl + "/" + quoteID;
        const response = await axios.delete(url);
        console.log(
            'Successfully deleted quote from API' + 
            '\nusername: '+ username + 
            "\nquote: "+ quote + 
            "\nID: "+ quoteID + 
            "\nHTTP-response: " + response);
        return "Successfully removed from the Wall!"
    } catch (error) {
        console.error('Error could not delete quote: ', error);
        return "Something went wrong. Please contact Delta+"
    }
};

// Gathers all the quotes
const getAllQuotes = async () => {
    try {
        const response = await axios.get(listUrl);
        console.log('Successfully recieved all quotes for removal');
        return response.data as Response[]; 
    } catch (error) {
        console.error('Error recieving all the quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

    
module.exports = {
    // Slash command for the removal of quotes 
    data: new SlashCommandBuilder()
        .setName('QuoteWall/Remove-Qoute')
        .addChannelOption(option => option.setName("quote").setDescription("quote to remove").setRequired(true))
        .setDescription('Remove a quote for the wall')
        .addStringOption(option =>
            option.setName('quote')
                .setDescription('Quote to autocomplete')
                .setAutocomplete(true)),
    // Autocomplete for the discord bot
    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        const i = await getAllQuotes(); 

        if (focusedOption.name === 'quote') {
            if (typeof i === 'object') {
                for (const j of i) {
                quotes.push(j.quote); 
            }
        }
        const filtered = quotes.filter(quote => quote.startsWith(focusedOption.value));
        await interaction.respond(
            filtered.map(quote => ({ name: quote, value: quote })),
        );

        async function execute(interaction: CommandInteraction) {
            const rmQuote: string = interaction.options.get("quote")!.value as string;
            const username: string = interaction.user.username;
            const allQuotes = await getAllQuotes();

            if (typeof allQuotes === 'object') {
                for (let i = 0; i < allQuotes.length; i++) {
                    if (allQuotes[i].quote == rmQuote){
                        rmID = allQuotes[i].id;
                        break;
                    }
                }

                const reply: string = await removeQuote(rmID, rmQuote, username);
                return interaction.reply(reply);
            }

        }
    }
    }
}