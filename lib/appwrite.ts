import { Account, Avatars, Client } from "appwrite";

export const config = {
    platform: "com.jsm.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {

    } catch (error) {
        console.error(error);
        return false;
    }
}


