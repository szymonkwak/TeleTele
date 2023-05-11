import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/styles/theme';
import Header from '@/components/common/Header';
import { routesArray } from '@/routes/routes';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      <Header links={routesArray} />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
