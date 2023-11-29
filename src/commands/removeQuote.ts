import axios from 'axios';
import {config} from "../config";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";


const url: string = config.API_SERVER;

// array for all the quotes
var quotes: string[];

// sends DELETE http request to API
const removeQuote = async (quoteId: number) => {
    try {
        const response = await axios.delete(url, {
            data: {
                id: quoteId
            }
        });
        console.log(
            'Successfully deleted quote from API' +
            "\nID: " + quoteId +
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
    console.log(interaction)
    const rmQuote = interaction.options.get('quote')?.value as string | undefined;
    console.log(`user input: ${rmQuote}`)

    if(rmQuote) {
        const reply = await removeQuote(parseInt(rmQuote));
        return interaction.reply(reply)
    }

    return interaction.reply("smt went wrong")
}
    
  