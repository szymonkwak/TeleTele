import { Tabs, createStyles, rem } from '@mantine/core';
import { List, Package } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { HEADER_HEIGHT_PX } from '@/components/common/Header';
import { ExistingItems, ExistingPackages } from '@/components/operator';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    minHeight: '100vh',
    maxWidth: rem(1200),
    padding: rem(20),
    marginTop: rem(-HEADER_HEIGHT_PX),
    paddingTop: rem(HEADER_HEIGHT_PX),

    [theme.fn.smallerThan('xl')]: { maxWidth: '85vw' },
    [theme.fn.smallerThan('md')]: { maxWidth: 'none' },
  },
}));

const Operator = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Tabs value={router.query.tab?.[0] as string} onTabChange={(value) => router.push(`/operator/${value}`)} className={classes.container}>
      <Tabs.List mt="md" mb="md">
        <Tabs.Tab value="items" icon={<List />}>
          Lista usług
        </Tabs.Tab>
        <Tabs.Tab value="packages" icon={<Package />}>
          Lista pakietów
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="items">
        <ExistingItems />
      </Tabs.Panel>
      <Tabs.Panel value="packages">
        <ExistingPackages />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Operator;
