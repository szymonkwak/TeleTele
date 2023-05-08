import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Item, Package } from '@/db/types';
import useAppData from '@/db/useAppData';

/**
 * Hook for calculating total price of items in cart and applied package
 *
 * @param cart array of items in cart
 * @returns total price of items in cart and applied package
 */
const useCalculateTotal = (cart: Item[]) => {
  const [total, setTotal] = useState(0);
  const [appliedPackage, setAppliedPackage] = useState<Package | null>(null);

  const { packagesData } = useAppData();

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    const cartItemsIds = cart.map((item) => item.id);

    const packages = cart.length ? packagesData.filter((pack) => pack.year === cart[0].year) : [];
    const discounts = packages.map((pckg) => (_.intersection(cartItemsIds, pckg.ids).length === pckg.ids.length ? pckg.discount : 0));

    return total - Math.max(...discounts);
  };

  const getAppliedPackage = () => {
    const cartItemsIds = cart.map((item) => item.id);

    const packages = cart.length ? packagesData.filter((pack) => pack.year === cart[0].year) : [];
    const appliedPackages = packages
      .map((pckg) => (_.intersection(cartItemsIds, pckg.ids).length === pckg.ids.length ? pckg : null))
      .filter((pckg): pckg is Package => pckg !== null)
      .sort((a, b) => b.discount - a.discount);

    return appliedPackages[0] || null;
  };

  useEffect(() => {
    setTotal(calculateTotal());
    setAppliedPackage(getAppliedPackage());
  }, [cart]);

  return { total, appliedPackage };
};

export default useCalculateTotal;
