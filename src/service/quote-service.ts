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

export type QuoteVote = {
    id: number
    discordId: string
    quoteId: number
}

export type Vote = {
    id: number
    createdAt: string
    updatedAt: string
    discordId: string
    quoteId: number
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

    return axios.get<QuoteCollection>(url.href);
};

export const createQuote = async (discordId: string, quote: string) => {
    return axios.post<Quote>(config.API_SERVER, {
        text: quote,
        discordId: discordId,
    });
};


export const deleteQuote = async (quoteId: number) => {
    return axios.delete(`${config.API_SERVER}/${quoteId}`, {});
};

export const voteQuote = async (quoteId: number, discordId: string) => {
    return axios.post<QuoteVote>(`${config.API_SERVER}/${quoteId}/vote`, {
        discordId: discordId,
    })
};

export const unVoteQuote = async (quoteId: number, discordId: string) => {
    return axios.delete(`${config.API_SERVER}/${quoteId}/vote`, {
        data: {
            discordId: discordId,
        }
    });
};

export const getVotes = async (discordId: string) => {
    const url = new URL(`${config.API_SERVER}/votes?discordId=${discordId}`)
    return await axios.get<Vote[] | ErrorResponse>(url.href);
}

export const getQuote = async (quoteId: number) => {
    const url = new URL(`${config.API_SERVER}?id=${quoteId}`)
    return await axios.get<QuoteCollection | ErrorResponse>(url.href);
}


