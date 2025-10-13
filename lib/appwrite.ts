import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
    Account,
    Avatars,
    Client,
    OAuthProvider
} from "react-native-appwrite";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export async function login() {
  try {
    // ✅ Step 1: check if user already logged in
    const existing = await account.get().catch(() => null);
    if (existing) {
      console.log("User already logged in, clearing old session...");
      await account.deleteSession("current"); // remove previous session
    }

    // ✅ Step 2: perform OAuth2 login again
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to start login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success")
      throw new Error("Failed to complete login");

    // ✅ Step 3: extract credentials
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("OAuth2 token creation failed");

    // ✅ Step 4: safely create new session
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    console.log("✅ Login successful for:", session.userId);
    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}