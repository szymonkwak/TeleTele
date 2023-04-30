import { useMantineTheme } from '@mantine/core';
import { appData as data } from './appData';
import { Antenna, DeviceTvOld, Phone, Tornado, Wifi } from 'tabler-icons-react';
import { useEffect } from 'react';

interface Icons {
  [key: string]: JSX.Element;
}

/**
 * Hook for managing app data
 *
 * @returns
 */
const useAppData = () => {
  const theme = useMantineTheme();

  const icons: Icons = {
    Internet: <Wifi size={60} strokeWidth={2} color={theme.primaryColor} />,
    Telewizja: <DeviceTvOld size={60} strokeWidth={2} color={theme.primaryColor} />,
    'Abonament telefoniczny': <Phone size={60} strokeWidth={2} color={theme.primaryColor} />,
    Dekoder: <Antenna size={60} strokeWidth={2} color={theme.primaryColor} />,
    default: <Tornado size={60} strokeWidth={2} color={theme.primaryColor} />,
  };

  const appData = data.map((item) => ({
    ...item,
    icon: icons[item.name] || icons.default,
  }));

  return { appData };
};

export default useAppData;
