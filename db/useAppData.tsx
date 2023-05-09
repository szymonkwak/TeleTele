import { useEffect, useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { Antenna, DeviceTvOld, Phone, Tornado, Wifi } from 'tabler-icons-react';
import { appData as itemsData } from './appData';
import { packagesData as pckgData } from './packagesData';
import { Item, ItemWithIcon, Package } from './types';

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

  const [appData, setAppData] = useState<ItemWithIcon[]>([]);
  const [packagesData, setPackagesData] = useState<Package[]>([]);

  const resetItems = () => {
    window.localStorage.removeItem('appData');
    window.location.reload();
  };

  const resetPackages = () => {
    window.localStorage.removeItem('packagesData');
    window.location.reload();
  };

  const icons: Icons = {
    Internet: <Wifi size={60} strokeWidth={2} color={theme.primaryColor} />,
    Telewizja: <DeviceTvOld size={60} strokeWidth={2} color={theme.primaryColor} />,
    'Abonament telefoniczny': <Phone size={60} strokeWidth={2} color={theme.primaryColor} />,
    Dekoder: <Antenna size={60} strokeWidth={2} color={theme.primaryColor} />,
    default: <Tornado size={60} strokeWidth={2} color={theme.primaryColor} />,
  };

  const defaultIcon = icons.default;

  const getAppDataWithIcons = (data: Item[]): ItemWithIcon[] =>
    data.map((item) => ({
      ...item,
      icon: icons[item.name] || icons.default,
    }));

  useEffect(() => {
    if (packagesData.length) window.localStorage.setItem('packagesData', JSON.stringify(packagesData));
    if (appData.length)
      window.localStorage.setItem('appData', JSON.stringify(appData.map(({ id, name, year, price }) => ({ id, name, year, price }))));
  }, [packagesData, appData]);

  useEffect(() => {
    const packagesFromStorage = window.localStorage.getItem('packagesData');
    packagesFromStorage ? setPackagesData(JSON.parse(packagesFromStorage)) : setPackagesData(pckgData);

    const appDataFromStorage = window.localStorage.getItem('appData');
    const data: Omit<Item, 'icon'>[] = appDataFromStorage ? JSON.parse(appDataFromStorage) : itemsData;

    setAppData(getAppDataWithIcons(data));
  }, []);

  return { appData, setAppData, packagesData, setPackagesData, resetItems, resetPackages, defaultIcon };
};

export default useAppData;
