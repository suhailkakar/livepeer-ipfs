import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LivepeerConfig } from "@livepeer/react";
import { createReactClient, studioProvider } from "@livepeer/react";

const client = createReactClient({
  provider: studioProvider({ apiKey: "LIVEPEER_STUDIO_API_KEY" }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}
