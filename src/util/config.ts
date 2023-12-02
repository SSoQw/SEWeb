// lazy
// webpack should be the one handling env vars on fe but :shrug:
const config = {
    baseurl: "http://localhost",
    port: 3001,
}

export const urlWithPort = `${config.baseurl}:${config.port}`