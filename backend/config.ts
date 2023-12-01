import dotenv from "dotenv";
dotenv.config();

type Config = {
    port: number;
    secret: string;
    cookiename: string
}

// This is typically a bad idea. 
// Ideally at runtime you want to decode process.env 
// as type `Config` and fatal if it isn't.
// We're doing it this way so TS knows what the config 
// contains so we don't have to pass around potentially undefined things
export const dconfig = process.env as unknown as Config;