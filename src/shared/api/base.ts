// import Constants from "expo-constants";

// If it works on the same maching as the emulator. Otherwise specify an IP address/domain of the server
// const API_IP = Constants.expoConfig?.hostUri?.split(":")[0];
const API_IP = process.env.EXPO_PUBLIC_API_URL || "192.168.0.123";

export const ApiUrl = __DEV__ ? `http://${API_IP}:${process.env.EXPO_PUBLIC_API_PORT || 3000}` : "https://api.example.com";
