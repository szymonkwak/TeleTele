export interface Item {
  id: string;
  name: string;
  price: number;
  year: string;
}

export interface Package {
  ids: string[];
  name: string;
  year: string;
  discount: number;
}
