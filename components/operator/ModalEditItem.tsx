import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Flex, Modal, NumberInput, TextInput } from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { DeviceFloppy, Rotate } from 'tabler-icons-react';
import { ItemWithIcon } from '@/db/types';
import useAppData from '@/db/useAppData';

interface ModalEditItemProps {
  item: ItemWithIcon;
  setItemToEdit: Dispatch<SetStateAction<ItemWithIcon | null>>;
}

const ModalEditItem = (props: ModalEditItemProps) => {
  const { item, setItemToEdit } = props;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const { appData, setAppData } = useAppData();

  const form = useForm({
    initialValues: {
      id: item.id,
      name: item.name,
      year: parseInt(item.year, 10),
      price: item.price,
    },
    validate: {
      name: isNotEmpty('Nazwa nie może być pusta'),
      price: isInRange({ min: 0 }, 'Podaj poprawną cenę'),
      year: isInRange({ min: 2022, max: 3000 }, 'Podaj rok od 2022 wzwyż'),
    },
  });

  const handleSaveEdited = () => {
    const { id, name, price, year } = form.values;
    const edit = appData.some((i) => i.id === id);
    const updatedItem = { id, name, price, year: year.toString(), icon: item.icon };

    if (form.isValid()) {
      setAppData(edit ? appData.map((i) => (i.id === id ? updatedItem : i)) : appData.concat(updatedItem));
      window.location.reload();
    }
  };

  return (
    <Modal title="Edycja usługi" fullScreen={isMobile} opened={!!item} onClose={() => setItemToEdit(null)}>
      <Box component="form" onSubmit={form.onSubmit(handleSaveEdited)}>
        <TextInput label="Nazwa usługi" {...form.getInputProps('name')} mt="sm" />
        <NumberInput label="Rok" {...form.getInputProps('year')} mt="sm" />
        <NumberInput label="Cena" precision={2} {...form.getInputProps('price')} mt="sm" />
        <Flex mt="md" justify="space-between">
          <Button onClick={form.reset} rightIcon={<Rotate />} variant="default">
            Resetuj
          </Button>
          <Button type="submit" rightIcon={<DeviceFloppy />}>
            Zapisz
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};

export default ModalEditItem;
