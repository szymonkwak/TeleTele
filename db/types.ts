export interface Item {
  id: string;
  name: string;
  price: number;
  year: string;
}

export interface ItemWithIcon extends Item {
  icon: JSX.Element;
}

export interface Package {
  id: string;
  packageItems: string[];
  name: string;
  year: string;
  discount: number;
}
