import React from 'react';
import { ActionIcon, Button, Text, createStyles, rem } from '@mantine/core';
import { ArrowNarrowRight, Trash, TrashX } from 'tabler-icons-react';
import { Item } from '@/db/types';
import { useCalculateTotal } from '@/hooks';

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: rem(350),
    backgroundColor: theme.colors.dark[8],
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    margin: rem(10),
    fontSize: rem(26),
    fontWeight: 700,
    flexShrink: 0,
  },

  empty: {
    textAlign: 'center',
    marginBottom: rem(43),
  },

  cart: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(5),
    padding: rem(10),
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 3,
    padding: rem(10),
    backgroundColor: theme.colors.dark[5],
  },

  total: {
    borderTop: `1px solid ${theme.colors.dark[2]}`,
    borderBottom: `1px solid ${theme.colors.dark[2]}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: rem(10),
    backgroundColor: theme.colors.dark[5],
  },

  btns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: rem(10),
    padding: rem(10),
    marginTop: rem(20),
  },
}));

interface CartProps {
  cart: Item[];
  deleteFromCart: (id: string) => void;
  emptyCart: () => void;
  onSummary: () => void;
}

const Cart = (props: CartProps) => {
  const { cart, deleteFromCart, emptyCart, onSummary } = props;

  const { classes, theme } = useStyles();
  const { total } = useCalculateTotal(cart);

  return (
    <div className={classes.container}>
      <Text className={classes.title}>Zawartość koszyka:</Text>

      {cart.length ? (
        <div className={classes.cart}>
          {cart.map((item) => (
            <div className={classes.item} key={item.id}>
              {item.name}, {item.year}
              <ActionIcon onClick={() => deleteFromCart(item.id)}>
                <TrashX size={22} strokeWidth={1.5} color={theme.colors.red[6]} />
              </ActionIcon>
            </div>
          ))}
        </div>
      ) : (
        <Text className={classes.empty}>Koszyk jest pusty</Text>
      )}
      <div className={classes.total}>
        <Text>Suma:</Text>
        {cart.length ? total.toFixed(2) : '0.00'}
      </div>

      <div className={classes.btns}>
        <Button onClick={emptyCart} disabled={cart.length === 0} rightIcon={<Trash />} variant="default">
          Wyczyść
        </Button>
        <Button onClick={onSummary} disabled={cart.length === 0} rightIcon={<ArrowNarrowRight />} variant="filled">
          Podusmowanie
        </Button>
      </div>
    </div>
  );
};

export default Cart;
