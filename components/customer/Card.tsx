import { ReactNode, useState } from 'react';
import { createStyles, Text, rem, Button, Overlay } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    width: '450px',
    height: '200px',
    maxWidth: '450px',
    margin: rem(10),
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
    margin: '20px 0 0 20px',
    fontSize: rem(38),
    fontWeight: 700,
    lineHeight: 1,
  },

  price: {
    fontSize: rem(20),
    lineHeight: 1,
  },

  img: {
    width: '120px',
    height: '120px',
    minWidth: '120px',
    minHeight: '120px',
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
}

const Card = (props: CardProps) => {
  const { label, price, icon } = props;

  const { classes } = useStyles();
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleMouseEnter = () => setOverlayVisible(true);
  const handleMouseLeave = () => setOverlayVisible(false);

  const handleAddToCart = () => {
    console.log('dodano do koszyka');
  };

  return (
    <div role="button" className={classes.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.text}>
        <Text className={classes.label}>{label}</Text>
        <Text className={classes.price}>cena: {price.toFixed(2)}</Text>
      </div>

      <div className={classes.img}>{icon}</div>

      {overlayVisible && (
        <Overlay blur={2} center>
          <Button variant="outline" radius="xl" onClick={handleAddToCart}>
            Dodaj do koszyka
          </Button>
        </Overlay>
      )}
    </div>
  );
};

export default Card;
