import React from 'react';
import Link from 'next/link';
import { ActionIcon, Group, createStyles } from '@mantine/core';
import { BrandGithub, BrandLinkedin } from 'tabler-icons-react';

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface SocialsProps {
  className?: string;
}

const Socials = (props: SocialsProps) => {
  const { className } = props;

  const { classes, cx } = useStyles();

  return (
    <Group spacing={0} noWrap className={cx(className, classes.container)}>
      <Link href="https://www.linkedin.com/in/szymon-k-05ba13228/">
        <ActionIcon size="lg">
          <BrandLinkedin size="1.1rem" strokeWidth={1.5} />
        </ActionIcon>
      </Link>
      <Link href="https://github.com/szymonkwak">
        <ActionIcon size="lg">
          <BrandGithub size="1.1rem" strokeWidth={1.5} />
        </ActionIcon>
      </Link>
    </Group>
  );
};

export default Socials;
