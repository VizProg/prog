import type { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from "next-themes";
import { globalCss, darkTheme } from '@/stitches.config';
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";


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
  "::-webkit-scrollbar-thumb:hover":{
  },

  svg: { display: "block" },

  "pre, code": { margin: 0, fontFamily: "$mono" },

  "::selection": {
    backgroundColor: "$mint11",
    color: "$sage1",
  },
  "*": {
    boxSizing: "border-box",
  },
  h1: {
    fontSize: "$6",
    fontWeight: 500,
  },
  "h2, h3": {
    fontSize: "$5",
    fontWeight: 500,
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
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
  )
}
