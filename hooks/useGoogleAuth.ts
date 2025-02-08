import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import Constants from "expo-constants";
import { AuthSessionResult } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const EXPO_REDIRECT_PARAMS = {
  useProxy: true,
  scheme: "myapp",
};

const NATIVE_REDIRECT_PARAMS = { native: "myapp://" };

const REDIRECT_PARAMS =
  Constants.appOwnership === "expo"
    ? EXPO_REDIRECT_PARAMS
    : NATIVE_REDIRECT_PARAMS;

const redirectUri = makeRedirectUri(REDIRECT_PARAMS);

const config = {
  expoClientId: EXPO_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
  redirectUri,
};

interface UseGoogleAuthReturn {
  promptAsync: () => Promise<AuthSessionResult>;
}

export function useGoogleAuth(
  onSuccess: (accessToken: string) => void
): UseGoogleAuthReturn {
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (!response) return;

    console.log("Request:", request);
    console.log("Response:", response);
    console.log("Config:", config);
    console.log("Redirect URI:", redirectUri);

    if (response.type === "success" && response.authentication?.accessToken) {
      onSuccess(response.authentication.accessToken);
    } else if (response.type === "error") {
      console.error("Authentication error:", response.error);
    }
  }, [response]);

  return { promptAsync };
}
