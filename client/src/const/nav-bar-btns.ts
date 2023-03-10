export const NAVBAR_BTNS_AUTH: NavbarBtns[] = [
  { link: '/', text: 'Главная', id: 'main-nav' },
  { link: '/personal', text: 'Мое', id: 'person-nav' },
  { link: '/all-lists', text: 'Списки', id: 'list-nav' },
];

export const NAVBAR_BTNS: NavbarBtns[] = [
  { link: '/', text: 'Главная' },
  // { link: '/personal', text: 'Мое' },
  { link: '/all-lists', text: 'Списки' },
];

export const SIDEBAR_BTNS: NavbarBtns[] = [
  { link: '/user', text: 'Учетная запись' },
  { link: '/user/watch', text: 'История просмотра' },
  { link: '/user/reviews', text: 'Ваши отзывы' },
  { link: '/user/subscribeme', text: 'Подписки' },
  { link: '/user/promo', text: 'Промокод' },
  { link: '/user/settings', text: 'Настройки' },
  { link: '/user/reference', text: 'Справка' },
]; // TODO: сделать роутер под настройки
