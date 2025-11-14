import { Nest } from "owasp-nest";

export const nestClient = new Nest({
  apiKey: process.env.NEST_API_KEY ?? "",
});
