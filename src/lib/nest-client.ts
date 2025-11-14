import { Nest } from "owasp-nest";

export const nestClient = new Nest({
  apiKey: process.env.NEST_API_KEY ?? "",
});

export function getNestHeaders() {
  return {
    "X-API-Key": process.env.NEST_API_KEY ?? "",
    "Content-Type": "application/json",
  };
}

export function nestApiUrl(path: string) {
  return `https://nest.owasp.dev/api/v0${path}`;
}