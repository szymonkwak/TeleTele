import Head from 'next/head';
import { Button, MediaQuery, Text, Title, createStyles, rem } from '@mantine/core';
import Link from 'next/link';
import { routes } from '@/routes/routes';

const useStyles = createStyles((theme) => ({
  background: {
    marginTop: rem(-60),
    paddingTop: rem(60),
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundImage: 'url(/heroimg.jpg)',
    display: 'flex',
    alignItems: 'center',

    [theme.fn.smallerThan('sm')]: { justifyContent: 'center' },

    '& h1': {
      fontSize: '3.9rem',
      [theme.fn.smallerThan('sm')]: { fontSize: '2.5rem' },
    },

    '& h2': {
      fontWeight: 200,
      fontSize: '2rem',
      [theme.fn.smallerThan('sm')]: { fontSize: '1.5rem' },
    },
  },

  content: {
    marginLeft: '15%',
    maxWidth: rem(500),
    [theme.fn.smallerThan('sm')]: { margin: rem(30) },
  },

  text: { [theme.fn.largerThan('sm')]: { fontSize: '1.1rem' } },

  action: { '& button': { margin: '30px 0' } },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>TeleTele</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.background}>
        <div className={classes.content}>
          <Title order={2}>TeleTele</Title>
          <Title order={1}>Dostawca usług telekomunikacyjnych</Title>
          <Text className={classes.text}>
            W ofercie telewizja, internet, telefon oraz dekoder. <br /> Przy zakupie pakietów dostępne rabaty.
          </Text>
          <Link href={routes.customer} className={classes.action}>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Button size="xl">Zamów usługi</Button>
            </MediaQuery>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Button size="md">Zamów usługi</Button>
            </MediaQuery>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
