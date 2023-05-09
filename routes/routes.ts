const routes = {
  home: '/',
  customer: '/customer',
  operator: '/operator/items',
};

const routesArray = [
  {
    link: routes.home,
    label: 'Start',
  },
  {
    link: routes.customer,
    label: 'Strefa klienta',
  },
  {
    link: routes.operator,
    label: 'Strefa operatora',
  },
];

export { routes, routesArray };
