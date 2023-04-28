import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/styles/theme';
import Header from '@/components/common/Header';
import { routesArray } from '@/routes/routes';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Header links={routesArray} />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
