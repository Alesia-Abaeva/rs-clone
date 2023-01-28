import { createElem } from '../../utils/create-element';
import { createLink } from '../../utils/create-link-element';
import styles from './Header.module.scss';
import { linkHandler } from '../../utils/link-handler';
import { rednerNavbar } from './components/Navbar/Navbar';

export const renderHeader = (): HTMLElement => {
  const header: HTMLElement = createElem('header', 'header');

  const headerContainer: HTMLElement = createElem('div', 'header__container');

  const logo: HTMLElement = createElem('div', 'header__logo');
  const logoLink: HTMLElement = createElem('a', styles['header__logo-link']);
  logoLink.setAttribute('href', '/');
  logo.append(logoLink);

  logoLink.onclick = linkHandler;

  const navBar: HTMLElement = rednerNavbar();

  const accoutSection: HTMLElement = createElem('div', 'header__account');
  const loginBtn: HTMLElement = createElem('div', 'header__login');
  const loginLink: HTMLElement = createLink('/login', 'header__login-link', false, 'Войти');
  loginBtn.append(loginLink);

  loginLink.onclick = linkHandler;

  accoutSection.append(loginBtn);

  headerContainer.append(logo, navBar, accoutSection);
  header.append(headerContainer);

  return header;
};
