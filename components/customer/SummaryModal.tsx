import React from 'react';
import { Button, Modal, Table, Text, createStyles, rem } from '@mantine/core';
import { Item } from '@/db/types';
import { Rocket } from 'tabler-icons-react';
import { useCalculateTotal } from '@/hooks';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(20),
    fontWeight: 700,
    color: theme.colors.orange[4],
    marginBottom: rem(10),
    marginTop: rem(20),
  },

  price: { textAlign: 'end !important' as 'end' },

  summary: {
    marginTop: rem(30),
    borderTop: `1px solid ${theme.colors.orange[4]}`,
    color: theme.colors.orange[4],
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      fontSize: rem(24),
    },
  },

  order: {
    marginTop: rem(30),
    marginBottom: rem(16),
    float: 'right',
  },
}));

interface SummaryModalProps {
  open: boolean;
  setOpen: (opened: boolean) => void;
  cart: Item[];
}

const SummaryModal = (props: SummaryModalProps) => {
  const { open, setOpen, cart } = props;

  const { classes } = useStyles();
  const { total, appliedPackage } = useCalculateTotal(cart);

  return (
    <Modal title="Podsumowanie" opened={open} onClose={() => setOpen(false)} centered size="lg">
      <Text className={classes.title}>Zamówione usługi:</Text>
      <Table fontSize="lg">
        <thead>
          <tr>
            <th>Nazwa usługi</th>
            <th>Rok</th>
            <th className={classes.price}>Cena</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td className={classes.price}>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Suma:</th>
            <th className={classes.price}>{cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</th>
          </tr>
        </tfoot>
      </Table>

      <Text className={classes.title}>Aktywowane pakiety:</Text>
      {appliedPackage ? (
        <Table fontSize="lg">
          <thead>
            <tr>
              <th>Nazwa pakietu</th>
              <th className={classes.price}>Rabat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{appliedPackage.name}</td>
              <td className={classes.price}>{appliedPackage.discount.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Text>Brak aktywowanych pakietów</Text>
      )}
      <div className={classes.summary}>
        <Text>Do zapłaty:</Text>
        <Text>{total.toFixed(2)}</Text>
      </div>

      <Button disabled className={classes.order} rightIcon={<Rocket />}>
        Zamów
      </Button>
    </Modal>
  );
};

export default SummaryModal;
