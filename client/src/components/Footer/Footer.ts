import { projectTitle } from 'src/const/project-title';
import { createElem } from 'src/utils/create-element';
import { createLink } from 'src/utils/create-link-element';
import { rederCredentials } from './components/Credentials/Credentials';
import { renderThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import styles from './Footer.module.scss';

export const renderFooter = (): HTMLElement => {
  const footer: HTMLElement = createElem('footer', styles['footer']);
  const footerContainer: HTMLElement = createElem('div', 'footer__container');

  const themeSwitch: HTMLElement = renderThemeSwitcher();

  const footerCredentials: HTMLElement = rederCredentials(['Alesia-Abaeva', 'lgklsv', 'gamesam88']);

  const footerCopyright: HTMLElement = createElem('div', 'footer__copyright');

  const rsSchoolLink: HTMLElement = createLink('https://rs.school/js/', 'rs-school-link', true, '');

  const copyrightText: HTMLElement = createElem('p', 'footer__text');
  copyrightText.innerHTML = `© 2023 ${projectTitle}. All rights reserved.`;

  footerCopyright.append(rsSchoolLink, copyrightText);

  footerContainer.append(themeSwitch, footerCredentials, footerCopyright);
  footer.append(footerContainer);
  return footer;
};
