import Constants from "expo-constants";

const API_IP = Constants.expoConfig?.hostUri?.split(":")[0];

export const ApiUrl = __DEV__
  ? `http://${API_IP}:${process.env.API_PORT || 3000}`
  : "https://api.example.com";
