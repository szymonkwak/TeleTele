import { createStyles, Header as MantineHeader, Container, Group, Burger, Paper, Transition, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Socials from './Socials';

export const HEADER_HEIGHT_PX = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: rem(HEADER_HEIGHT_PX),
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: { display: 'none' },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },

  burger: {
    [theme.fn.largerThan('sm')]: { display: 'none' },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    border: '1px solid transparent',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      border: '1px solid',
      borderColor: theme.colors.orange[7],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  socials: {
    marginRight: rem(40),
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
}));

interface HeaderProps {
  links: { link: string; label: string }[];
}

const Header = ({ links }: HeaderProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const router = useRouter();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: `/${router.asPath.split('/')[1]}` === `/${link.link.split('/')[1]}` })}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <MantineHeader height={rem(HEADER_HEIGHT_PX)} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <Socials />
            </Paper>
          )}
        </Transition>
        <Socials className={classes.socials} />
      </Container>
    </MantineHeader>
  );
};

export default Header;
