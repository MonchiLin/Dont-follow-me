import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/react";
import {RecoilRoot} from "recoil";
import {PhotoExifView} from "@/components/photo-exif-view";
import "@react-stately/utils/dist/main.js"
import "@react-aria/utils/dist/main.js"

export default function App({Component, pageProps}: AppProps) {

  return (
    <RecoilRoot>
      <NextUIProvider>
        <Head>
          <title>凤梨</title>
        </Head>
        <Component {...pageProps} />
        <PhotoExifView/>
      </NextUIProvider>
    </RecoilRoot>
  )
}
