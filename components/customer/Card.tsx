import { ReactNode, useState } from 'react';
import { createStyles, Text, rem, Button, Overlay } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    width: '420px',
    height: '190px',
    maxWidth: '420px',
    margin: 'auto',
    padding: rem(20),
    borderStyle: 'solid',
    borderColor: theme.colors.orange[5],
    backgroundColor: theme.colors.dark[9],
    display: 'flex',
    justifyContent: 'space-between',
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  label: {
    margin: '16px 0 0 16px',
    fontSize: rem(32),
    fontWeight: 700,
    lineHeight: 1,
  },

  price: {
    fontSize: rem(18),
    lineHeight: 1,
  },

  img: {
    width: '100px',
    height: '100px',
    minWidth: '100px',
    minHeight: '100px',
    borderRadius: '100%',
    marginRight: rem(20),
    alignSelf: 'center',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface CardProps {
  label: string;
  price: number;
  icon: ReactNode;
  addToCart: () => void;
}

const Card = (props: CardProps) => {
  const { label, price, icon, addToCart } = props;

  const { classes } = useStyles();
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleMouseEnter = () => setOverlayVisible(true);
  const handleMouseLeave = () => setOverlayVisible(false);

  return (
    <div role="button" className={classes.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.text}>
        <Text className={classes.label}>{label}</Text>
        <Text className={classes.price}>cena: {price.toFixed(2)}</Text>
      </div>

      <div className={classes.img}>{icon}</div>

      {overlayVisible && (
        <Overlay blur={2} center>
          <Button variant="outline" radius="xl" onClick={addToCart}>
            Dodaj do koszyka
          </Button>
        </Overlay>
      )}
    </div>
  );
};

export default Card;
