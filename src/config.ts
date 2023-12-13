import * as dotenv from 'dotenv'
import * as process from "process";

dotenv.config()

const {
    TOKEN, 
    APPLICATION_ID, 
    API_SERVER,
    API_TOKEN,
} = process.env

if (!APPLICATION_ID) {
    throw new Error("Missing application id, please update .env file")
}

if (!TOKEN) {
    throw new Error("Missing token, please update .env file")
}

if (!API_SERVER) {
    throw new Error("Missing api server, please update .env file")
}

if (!API_TOKEN) {
    throw new Error("Missing api token, please update .env file")
}

export const config = {
    APPLICATION_ID,
    TOKEN,
    API_SERVER,
    API_TOKEN
}