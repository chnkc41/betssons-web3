const apiRoot = 'http://localhost:5000';

export const APP_ROOT = apiRoot;

export const urls = {
  // URL_USERS: `${APP_ROOT}/users`,
  URL_EXPENSES: `${APP_ROOT}/expenses`,
};

export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

export const CONTROL_SIZES = {
  [SIZES.XS]: 7,
  [SIZES.SM]: 9,
  [SIZES.MD]: 11,
  [SIZES.LG]: 14,
  [SIZES.XL]: 17,
};

// Expenses

export const initialExpensesForm = {
  id: '1',
  name: 'expense  1',
  description: 'lorem ipsum sit amet',
  amount: '30',
  date: '2023-07-05',
};

export const initialExpensesErrorForm = {
  name: false,
  description: false,
  amount: false,
  date: false,
};
