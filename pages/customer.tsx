import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Card, YearSelect, Cart, MobileDrawer, SummaryModal } from '@/components/customer';
import { SimpleGrid, Stack, createStyles, rem } from '@mantine/core';
import useAppData from '@/db/useAppData';
import { Item } from '@/db/types';
import { HEADER_HEIGHT_PX } from '@/components/common/Header';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '100vh',
    marginTop: rem(-HEADER_HEIGHT_PX),
    paddingTop: rem(HEADER_HEIGHT_PX),
  },

  offer: {
    flexGrow: 1,
    padding: `${rem(10)} ${rem(30)}`,
    [theme.fn.smallerThan('sm')]: { padding: rem(10) },
  },

  grid: {
    maxWidth: '990px',
    padding: rem(30),
  },
}));

const Customer = () => {
  const { appData } = useAppData();
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [summaryOpened, setSummaryOpened] = useState(false);
  const [year, setYear] = useState('');
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    if (appData.length) setYear(appData[0].year);
  }, [appData]);

  const addToCart = (item: Item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) return console.log('already in cart'); // TODO popup item already in cart
    if (cart.some((cartItem) => cartItem.year !== item.year)) return console.log('from different year'); // TODO popup item from different year
    if (item.id.includes('dekoder') && !cart.some((cartItem) => cartItem.id.includes('telewizja')))
      return console.log('dekoder without TV'); // TODO popup dekoder without TV
    setCart((prev) => prev.concat(item));
  };

  const deleteFromCart = (id: string) => setCart((prev) => prev.filter((item) => item.id !== id));
  const emptyCart = () => setCart([]);

  const showSummary = () => {
    setSummaryOpened(true);
    setDrawerOpened(false);
  };

  return (
    <>
      <Head>
        <title>TeleTele - strefa klienta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={classes.container}>
        <Stack align="center" spacing={0} className={classes.offer}>
          <YearSelect year={year} setYear={setYear} appData={appData} />
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 1380, cols: 1, spacing: 'md' }]} className={classes.grid}>
            {appData
              .filter((item) => item.year === year)
              .map((item) => (
                <Card key={item.id} label={item.name} price={item.price} icon={item.icon} addToCart={() => addToCart(item)} />
              ))}
          </SimpleGrid>
        </Stack>

        {isMobile ? (
          <MobileDrawer open={drawerOpened} setOpen={setDrawerOpened} indicatorValue={cart.length}>
            <Cart cart={cart} deleteFromCart={deleteFromCart} emptyCart={emptyCart} onSummary={showSummary} />
          </MobileDrawer>
        ) : (
          <Cart cart={cart} deleteFromCart={deleteFromCart} emptyCart={emptyCart} onSummary={showSummary} />
        )}

        <SummaryModal cart={cart} open={summaryOpened} setOpen={setSummaryOpened} />
      </div>
    </>
  );
};

export default Customer;
