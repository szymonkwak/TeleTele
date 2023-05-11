import React from 'react';
import { Button, Flex } from '@mantine/core';
import { Plus, Rotate } from 'tabler-icons-react';

interface ResetAddButtonsProps {
  reset: () => void;
  addNew: () => void;
}

const ResetAddButtons = (props: ResetAddButtonsProps) => {
  const { reset, addNew } = props;

  return (
    <Flex mt="md" justify="end" gap={10}>
      <Button onClick={reset} rightIcon={<Rotate />} variant="outline">
        Zresetuj
      </Button>
      <Button onClick={addNew} rightIcon={<Plus />} variant="outline">
        Dodaj
      </Button>
    </Flex>
  );
};

export default ResetAddButtons;
