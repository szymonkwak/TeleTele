import Head from 'next/head';
import { Button, MediaQuery, Text, Title, createStyles, rem } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/routes/routes';
import { HEADER_HEIGHT_PX } from '@/components/common/Header';

const useStyles = createStyles((theme) => ({
  background: {
    marginTop: rem(-HEADER_HEIGHT_PX),
    paddingTop: rem(HEADER_HEIGHT_PX),
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
      [theme.fn.smallerThan('sm')]: { fontSize: '2rem' },
    },
  },

  content: {
    marginLeft: '15%',
    marginBottom: rem(100),
    maxWidth: rem(500),
    [theme.fn.smallerThan('sm')]: { margin: rem(30), marginBottom: rem(150) },
  },

  logo: { marginLeft: rem(-3), [theme.fn.smallerThan('sm')]: { width: 140 } },

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
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={classes.background}>
        <div className={classes.content}>
          <Image src="/logo.svg" alt="logo" className={classes.logo} width={160} height={70} />
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
