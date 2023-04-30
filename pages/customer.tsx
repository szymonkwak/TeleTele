import { useState } from 'react';
import { Card, YearSelect } from '@/components/customer';
import { Flex, SimpleGrid, createStyles } from '@mantine/core';
import useAppData from '@/db/useAppData';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const Customer = () => {
  const { appData } = useAppData();
  const { classes } = useStyles();

  const [year, setYear] = useState('2023');

  return (
    <Flex direction="column" align="center">
      <YearSelect year={year} setYear={setYear} />

      <SimpleGrid
        cols={2}
        spacing={30}
        breakpoints={[{ maxWidth: 990, cols: 1, spacing: 'md' }]}
        sx={{ maxWidth: '990px', padding: '30px' }}
      >
        {appData
          .filter((item) => item.year === year)
          .map((item) => (
            <Card key={item.id} label={item.name} price={parseFloat(item.price)} icon={item.icon} />
          ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Customer;
