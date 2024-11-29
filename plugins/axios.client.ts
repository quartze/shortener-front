import axios from "axios";

export default defineNuxtPlugin((app) => {
  const runtimeConfig = useRuntimeConfig();

  const client = axios.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(async (config) => {
    const authorization = localStorage.getItem(runtimeConfig.public.accessTokenName);
    const refresh = localStorage.getItem(runtimeConfig.public.refreshTokenName);

    if (authorization) config.headers["Authorization"] = `Bearer ${authorization}`;
    if (refresh) config.headers["Refresh"] = `Bearer ${refresh}`;

    return config;
  });

  client.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      const response = error.response;
      if (response.status === 401 && response.data.message.startsWith("The Token has expired")) {
        console.log("[API] Token refreshing strategy.");

        const { data } = await axios.post(runtimeConfig.public.apiBaseUrl + "/auth/refresh",
          {},
          {
            headers: {
              "Refresh": `Bearer ${localStorage.getItem(runtimeConfig.public.refreshTokenName)}`
            }
          }
        );
        localStorage.setItem(runtimeConfig.public.accessTokenName, data.token);

        return client.request(response.config);
      }
      throw error;
    }
  );

  app.provide("api", client);
});
