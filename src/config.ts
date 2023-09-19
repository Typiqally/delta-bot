import * as dotenv from 'dotenv'
import * as process from "process";

dotenv.config()

const {TOKEN, APPLICATION_ID} = process.env

if (!APPLICATION_ID) {
    throw new Error("Missing application id, please update .env file")
}

if (!TOKEN) {
    throw new Error("Missing token, please update .env file")
}

export const config = {
    APPLICATION_ID,
    TOKEN
}