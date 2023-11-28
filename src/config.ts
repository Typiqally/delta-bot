import * as dotenv from 'dotenv'
import * as process from "process";

dotenv.config()

const {
    TOKEN, 
    APPLICATION_ID, 
    API_SERVER,
    API_CREATE_PATH,
    API_LIST_PATH,
    API_REMOVE_PATH,
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

if (!API_CREATE_PATH) {
    throw new Error("Missing api create path, please update .env file")
}

if (!API_LIST_PATH) {
    throw new Error("Missing api list path, please update .env file")
}

if (!API_REMOVE_PATH) {
    throw new Error("Missing api remove path, please update .env file")
}

if (!API_TOKEN) {
    throw new Error("Missing api token, please update .env file")
}

export const config = {
    APPLICATION_ID,
    TOKEN,
    API_SERVER,
    API_CREATE_PATH,
    API_LIST_PATH,
    API_REMOVE_PATH,
    API_TOKEN
}