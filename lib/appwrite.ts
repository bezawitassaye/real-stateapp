import { Account, Avatars, Client, OAuthProvider } from "appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";


export const config = {
    platform: "com.jsm.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client()

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
      const redirectUri = Linking.createURL("./")

      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      )
      if(!response)
        throw new Error("Faild to login")

      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      )
      
    } catch (error) {
        console.error(error);
        return false;
    }
}


