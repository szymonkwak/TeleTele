import React, { useState } from 'react';
import { ActionIcon, Table, Tooltip, createStyles } from '@mantine/core';
import { Edit, TrashX } from 'tabler-icons-react';
import useAppData from '@/db/useAppData';
import ResetAddButtons from './ResetAddButtons';
import { Package } from '@/db/types';
import ModalEditPackage from './ModalEditPackage';

const useStyles = createStyles((theme) => ({
  table: {
    '& th:not(:first-of-type)': { textAlign: 'right !important' as 'right' },
    '& td:not(:first-of-type)': { textAlign: 'right !important' as 'right' },
    '& th': { color: `${theme.colors.orange[4]} !important` },
  },

  action: { display: 'flex', justifyContent: 'end', gap: 3 },

  red: { color: theme.colors.red[6] },
}));

const ExistingPackages = () => {
  const { classes } = useStyles();
  const { packagesData, setPackagesData, resetPackages } = useAppData();

  const [packageToEdit, setPackageToEdit] = useState<Package | null>(null);

  const handleDelete = (id: string) => setPackagesData((prev) => prev.filter((pckg) => pckg.id !== id));
  const handleEdit = (pckg: Package) => setPackageToEdit(pckg);
  const handleAddNewPckg = () => setPackageToEdit({ id: crypto.randomUUID(), name: '', packageItems: [], year: '2022', discount: 0 });

  return (
    <>
      <Table highlightOnHover fontSize="md" className={classes.table}>
        <thead>
          <tr>
            <th>Nazwa pakietu</th>
            <th>Rok</th>
            <th>Rabat</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {packagesData.map((pckg) => (
            <tr key={pckg.id.toString()}>
              <td>{pckg.name}</td>
              <td>{pckg.year}</td>
              <td>{pckg.discount.toFixed(2)}</td>
              <td className={classes.action}>
                <Tooltip label="Edytuj" onClick={() => handleEdit(pckg)}>
                  <ActionIcon>
                    <Edit strokeWidth={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Usuń">
                  <ActionIcon className={classes.red} onClick={() => handleDelete(pckg.id)}>
                    <TrashX strokeWidth={1.5} />
                  </ActionIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ResetAddButtons reset={resetPackages} addNew={handleAddNewPckg} />

      {packageToEdit ? <ModalEditPackage pckg={packageToEdit} setPackageToEdit={setPackageToEdit} /> : null}
    </>
  );
};

export default ExistingPackages;
