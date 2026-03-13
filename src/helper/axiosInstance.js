import axios from "axios";

let accessToken = null;
let tokenExpiry = null;

const amadeusAxios = axios.create({
  baseURL: "https://test.api.amadeus.com",
  timeout: 10000,
});

// function to get token
const getAmadeusToken = async () => {
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return accessToken;
};

// interceptor
amadeusAxios.interceptors.request.use(async (config) => {

  if (!accessToken || Date.now() >= tokenExpiry) {
    accessToken = await getAmadeusToken();
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default amadeusAxios;