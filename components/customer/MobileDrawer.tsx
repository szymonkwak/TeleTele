import React, { ReactNode } from 'react';
import { ActionIcon, Drawer, Indicator, createStyles, rem } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  cart: {
    position: 'absolute',
    zIndex: 1,
    top: rem(18),
    right: rem(10),
  },
}));

interface MobileDrawerProps {
  open: boolean;
  setOpen: (opened: boolean) => void;
  indicatorValue: number;
  children: ReactNode;
}

const MobileDrawer = (props: MobileDrawerProps) => {
  const { open, setOpen, indicatorValue, children } = props;
  const { classes, theme } = useStyles();

  return (
    <>
      <ActionIcon className={classes.cart} onClick={() => setOpen(true)}>
        <Indicator disabled={!indicatorValue} label={indicatorValue} size="lg">
          <ShoppingCart />
        </Indicator>
      </ActionIcon>
      <Drawer
        position="right"
        opened={open}
        onClose={() => setOpen(false)}
        styles={{
          header: { backgroundColor: theme.colors.dark[8] },
          content: { backgroundColor: theme.colors.dark[8] },
          body: { padding: 0 },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default MobileDrawer;
