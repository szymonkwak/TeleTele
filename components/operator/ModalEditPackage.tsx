import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Chip, Flex, Modal, NumberInput, Text, TextInput, createStyles, rem } from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { DeviceFloppy, Rotate } from 'tabler-icons-react';
import { Package } from '@/db/types';
import useAppData from '@/db/useAppData';

const useStyles = createStyles((theme) => ({
  chips: {
    marginTop: rem(20),
    paddingTop: rem(10),
    paddingBottom: rem(10),
    borderTop: `1px solid ${theme.colors.dark[3]}`,
    borderBottom: `1px solid ${theme.colors.dark[3]}`,
  },

  title: { marginBottom: rem(10) },

  error: {
    borderTop: `1px solid ${theme.colors.red[7]}`,
    borderBottom: `1px solid ${theme.colors.red[7]}`,
  },
  errorTxt: {
    marginTop: rem(10),
    fontSize: rem(12),
    color: theme.colors.red[7],
  },
}));

interface ModalEditItemProps {
  pckg: Package;
  setPackageToEdit: Dispatch<SetStateAction<Package | null>>;
}

const ModalEditPackage = (props: ModalEditItemProps) => {
  const { pckg, setPackageToEdit } = props;

  const { classes, cx } = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { packagesData, setPackagesData, appData } = useAppData();

  const form = useForm({
    initialValues: {
      id: pckg.id,
      packageItems: pckg.packageItems,
      name: pckg.name,
      year: parseInt(pckg.year, 10),
      discount: pckg.discount,
    },
    validate: {
      name: isNotEmpty('Nazwa nie może być pusta'),
      discount: isInRange({ min: 0 }, 'Podaj poprawną wartość rabatu'),
      year: isInRange({ min: 2022, max: 3000 }, 'Podaj rok od 2022 wzwyż'),
      packageItems: (value, values) =>
        value.length < 2
          ? 'Pakiet musi zawierać przynajmniej dwie usługi'
          : value.every((v) => appData.find((i) => i.id === v)?.year === values.year.toString())
          ? null
          : 'Wszystkie usługi muszą być z roku wybranego dla pakietu',
    },
  });

  const handleSaveEdited = () => {
    const { id, packageItems, name, discount, year } = form.values;
    const edit = packagesData.some((i) => i.id === id);
    const updatedPackage: Package = { id, packageItems, name, discount, year: year.toString() };

    if (form.isValid()) {
      setPackagesData(edit ? packagesData.map((i) => (i.id === id ? updatedPackage : i)) : packagesData.concat(updatedPackage));
      window.location.reload();
    }
  };

  return (
    <Modal title="Edycja pakietu" size={1000} fullScreen={isMobile} opened={!!pckg} onClose={() => setPackageToEdit(null)}>
      <Box component="form" onSubmit={form.onSubmit(handleSaveEdited)}>
        <TextInput label="Nazwa pakietu" {...form.getInputProps('name')} mt="sm" />
        <NumberInput label="Rok" {...form.getInputProps('year')} mt="sm" />
        <NumberInput label="Rabat" precision={2} {...form.getInputProps('discount')} mt="sm" />
        <div className={cx(classes.chips, { [classes.error]: form.getInputProps('packageItems').error })}>
          <Text className={classes.title}>Dodaj / usuń usługi zawarte w pakiecie:</Text>

          <Chip.Group multiple {...form.getInputProps('packageItems')}>
            <Flex wrap="wrap" gap={10}>
              {appData.map((item) => (
                <Chip key={item.id} value={item.id} variant="light" disabled={form.values.year.toString() !== item.year}>
                  {item.name}, rok: {item.year}
                </Chip>
              ))}
            </Flex>
          </Chip.Group>
          <Text className={classes.errorTxt}>{form.getInputProps('packageItems').error}</Text>
        </div>

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

export default ModalEditPackage;
