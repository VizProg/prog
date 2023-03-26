import type { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from "next-themes";
import { globalCss, darkTheme } from '@/stitches.config';
import {
  ClerkProvider,
} from "@clerk/nextjs";

import { ReactElement, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import { Provider } from "jotai";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const globalStyles = globalCss({
  html: {
    overflowX: "hidden",
  },

  body: {
    margin: 0,
    backgroundColor: "$mauve1",
    color: "$mauve12",
  },

  "body, button": {
    fontFamily: "$untitled",
  },

  "::-webkit-scrollbar": {
    width: '$2',
    height: '$2'
  },

  /* Track */
  "::-webkit-scrollbar-track": {
    background: 'transparent',
  },

  /* Handle */
  "::-webkit-scrollbar-thumb": {
    background: '$mauve8',
    borderRadius: "$pill",


  },
  "::-webkit-scrollbar-corner": {
    background: 'transparent',


  },

  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
  },

  svg: { display: "block" },

  "pre, code": { margin: 0, fontFamily: "$mono", fontSize: '$2' },

  "::selection": {
    backgroundColor: "$mint11",
    color: "$sage1",
  },
  "*": {
    boxSizing: "border-box",
  },
  h1: {
    fontSize: "$5",
    fontWeight: 500,
  },
  "h2, h3": {
    fontSize: "$4",
    fontWeight: 500,
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages: Array<string> = [];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps} >

      <Provider>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          value={{ light: darkTheme.className, dark: darkTheme.className }}
          defaultTheme={"system"}
        >
          {mounted ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <div style={{ visibility: "hidden" }}>
              <Component {...pageProps} />
            </div>
          )}
        </ThemeProvider>
      </Provider>

    </ClerkProvider>
  )
}
