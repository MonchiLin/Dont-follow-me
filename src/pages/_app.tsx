import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/react";
import {RecoilRoot} from "recoil";
import {PhotoExifView} from "@/components/photo-exif-view";

export default function App({Component, pageProps}: AppProps) {

  return (
    <RecoilRoot>
      <NextUIProvider>
        <Head>
          <title>黑凤梨</title>
        </Head>
        <Component {...pageProps} />
        <PhotoExifView/>
      </NextUIProvider>
    </RecoilRoot>
  )
}
