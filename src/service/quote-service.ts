import axios from "axios";
import {config} from "../config";

export type QuoteCollection = {
    totalCount: number
    quotes: Quote[]
}

export type Quote = {
    id: number
    text: string
    discordId: string
    createdAt: string
    updatedAt: string
    votes: []
}

export type ErrorResponse = {
    message: string
}

export const getQuotes = async (
    pageNumber: number | undefined = undefined,
    authorId: string | undefined = undefined
) => {
    const url = new URL(config.API_SERVER)

    if (pageNumber) {
        url.searchParams.append("page", pageNumber.toString())
    }

    if (authorId) {
        url.searchParams.append("discordId", authorId)
    }

    return await axios.get<QuoteCollection | ErrorResponse>(url.href);
};

export const createQuote = async (discordId: string, quote: string) => {
    return await axios.post<Quote | ErrorResponse>(config.API_SERVER, {
        text: quote,
        discordId: discordId,
    });
};


export const deleteQuote = async (quoteId: number) => {
    return await axios.delete(`${config.API_SERVER}/${quoteId}`, {});
};

export const voteQuote = async (quoteId: number, discordId: string) => {
    return await axios.post(`${config.API_SERVER}/${quoteId}/vote`, {
        discordId: discordId,
    });
};

export const unVoteQuote = async (quoteId: number, discordId: string) => {
    return await axios.delete(`${config.API_SERVER}/${quoteId}/vote`, {
        data: {
            discordId: discordId,
        }
    });
};
