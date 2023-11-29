import axios from "axios";
import {config} from "../config";
import {Quote} from "../commands/quote/list-quotes";

export const getQuotes = async (): Promise<Quote[] | string> => {
    try {
        const response = await axios.get(config.API_SERVER);
        console.log('Successfully received all quotes');

        return response.data as Quote[];
    } catch (error) {
        console.error('Error received all the quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

export const createQuote = async (discordId: string, quote: string) => {
    try {
        await axios.post(config.API_SERVER, {
            text: quote,
            discordId: discordId,
        });

        console.log('Successfully sent quote');
        return "Successfully sent to the Wall!"
    } catch (error) {
        console.error('Error sending username and quote to API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};


export const deleteQuote = async (quoteId: number) => {
    try {
        const response = await axios.delete(config.API_SERVER, {
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
