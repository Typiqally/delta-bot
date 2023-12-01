import axios from "axios";
import {config} from "../config";

export interface QuoteCollection {
    total_count: number
    quotes: Quote[]
}

export interface Quote {
    id: number
    text: string
    discordId: string
    createdAt: string
    updatedAt: string
    votes: []
}

export const getAllQuotes = async (): Promise<QuoteCollection | string> => {
    try {
        const response = await axios.get(config.API_SERVER);
        console.log('Successfully received all quotes');

        return response.data.quotes as QuoteCollection;
    } catch (error) {
        console.error('Error received all the quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

export const getAuthorQuotes = async (authorId: string): Promise<QuoteCollection | string> => {
    try {
        const response = await axios.get(`${config.API_SERVER}?discordId=${authorId}`,);
        console.log('Successfully received authors quotes');

        return response.data.quotes as QuoteCollection;
    } catch (error) {
        console.error('Error received the authors quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

export const getPageQuotes = async (pageNumber: number): Promise<QuoteCollection | string> => {
    try {
        const response = await axios.get(`${config.API_SERVER}?page=${pageNumber}`);

        return response.data as QuoteCollection;
    } catch (error) {
        console.error('Error received quotes from API:', error);
        return "Something went wrong. Please contact Delta+"
    }
}

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
        const response = await axios.delete(`${config.API_SERVER}/${quoteId}`, {});
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

export const voteQuote = async (quoteId: number, discordId: string) => {
    try {
        await axios.post(`${config.API_SERVER}/${quoteId}/vote`, {
            discordId: discordId,
        });

        console.log('Successfully sent vote');
        return "Successfully sent vote to the Wall!"
    } catch (error) {
        console.error('Error sending vote to API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};

export const unvoteQuote = async (quoteId: number, discordId: string) => {
    try {
        await axios.delete(`${config.API_SERVER}/${quoteId}/vote`, {
            data: {discordId: discordId,}
        });

        console.log('Successfully sent unvote');
        return "Successfully sent unvote to the Wall!"
    } catch (error) {
        console.error('Error sending unvote to API:', error);
        return "Something went wrong. Please contact Delta+"
    }
};
