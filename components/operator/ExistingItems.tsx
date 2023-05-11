import React, { useState } from 'react';
import { ActionIcon, Table, Tooltip, createStyles } from '@mantine/core';
import { Edit, TrashX } from 'tabler-icons-react';
import useAppData from '@/db/useAppData';
import { ItemWithIcon } from '@/db/types';
import ModalEditItem from './ModalEditItem';
import ResetAddButtons from './ResetAddButtons';

const useStyles = createStyles((theme) => ({
  table: {
    height: 0,
    '& th:not(:first-of-type)': { textAlign: 'right !important' as 'right' },
    '& td:not(:first-of-type)': { textAlign: 'right !important' as 'right' },
    '& th': { color: `${theme.colors.orange[4]} !important` },
  },

  action: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100%',
    gap: 3,
  },

  red: { color: theme.colors.red[6] },
}));

const ExistingItems = () => {
  const { classes } = useStyles();
  const { appData, setAppData, resetItems, defaultIcon } = useAppData();

  const [itemToEdit, setItemToEdit] = useState<ItemWithIcon | null>(null);

  const handleDelete = (id: string) => setAppData((prev) => prev.filter((item) => item.id !== id));
  const handleEdit = (item: ItemWithIcon) => setItemToEdit(item);
  const handleAddNewItem = () => setItemToEdit({ id: crypto.randomUUID(), name: '', year: '2022', price: 0, icon: defaultIcon });

  return (
    <>
      <Table highlightOnHover fontSize="md" className={classes.table}>
        <thead>
          <tr>
            <th>Nazwa usługi</th>
            <th>Rok</th>
            <th>Cena</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {appData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td>{item.price.toFixed(2)}</td>
              <td className={classes.action}>
                <Tooltip label="Edytuj" onClick={() => handleEdit(item)}>
                  <ActionIcon>
                    <Edit strokeWidth={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Usuń">
                  <ActionIcon className={classes.red} onClick={() => handleDelete(item.id)}>
                    <TrashX strokeWidth={1.5} />
                  </ActionIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ResetAddButtons reset={resetItems} addNew={handleAddNewItem} />

      {itemToEdit ? <ModalEditItem item={itemToEdit} setItemToEdit={setItemToEdit} /> : null}
    </>
  );
};

export default ExistingItems;
