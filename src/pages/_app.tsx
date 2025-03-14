import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import fetcher from "@/api/fetcher";
import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher }}>
        <div className="flex flex-col w-full min-h-screen">
          <Head>
            <title>피지컬노트 : 감독</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/icons/favicon.svg" />
          </Head>
          <Component {...pageProps} />
          <Toaster
            containerStyle={{ bottom: 100 }}
            position="bottom-center"
            reverseOrder={false}
          />
        </div>
      </SWRConfig>
    </RecoilRoot>
  );
}
