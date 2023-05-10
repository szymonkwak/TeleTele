import { Dispatch, SetStateAction } from 'react';
import { ChevronDown } from 'tabler-icons-react';
import { Flex, Select, Text, createStyles, rem } from '@mantine/core';
import { ItemWithIcon } from '@/db/types';

// TODO style na małym ekranie

const useStyles = createStyles((theme) => ({
  year: {
    fontSize: rem(38),
    fontWeight: 700,
    flexShrink: 0,
  },

  select: {
    width: rem(95),
    margin: rem(10),
    '& input': {
      color: theme.colors.orange[5],
      fontSize: rem(38),
      fontWeight: 700,
      backgroundColor: 'transparent',
      border: 'none',
      padding: '2px',
    },
    '& input:hover': { color: theme.colors.orange[7] },
  },
}));

interface YearSelectProps {
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  appData: ItemWithIcon[];
}

const YearSelect = (props: YearSelectProps) => {
  const { year, setYear, appData } = props;

  const { classes } = useStyles();

  const handleSelectChange = (e: string | null) => {
    if (e) setYear(e);
  };

  return (
    <Flex>
      <Text className={classes.year}>Wyświetl ofertę na rok</Text>
      <Select
        value={year}
        onChange={handleSelectChange}
        data={new Set(appData).size ? [...new Set([...appData.map((item) => item.year)])] : ['2023']}
        className={classes.select}
        rightSection={<ChevronDown size="0" />}
        rightSectionWidth={1}
      />
    </Flex>
  );
};

export default YearSelect;
