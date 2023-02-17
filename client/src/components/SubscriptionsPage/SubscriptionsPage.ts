import { SUBSCRIPTION_PLANS } from 'src/const/subscriptions-data';
import { createElem } from 'src/utils/create-element';
import { renderTariffCard } from './components/TariffCard/TariffCard';
import styles from './SubscriptionsPage.module.scss';

export const renderSubscriptions = (): HTMLElement => {
  const main: HTMLElement = createElem('main', 'main');
  main.classList.add('main_backdrop');
  const mainContainer: HTMLElement = createElem('div', 'main__container');
  const mainContent: HTMLElement = createElem('div', styles['subscriptions']);

  const subsTitle: HTMLElement = createElem('h1', 'subscriptions__title');
  subsTitle.innerHTML = 'Выберите подписку';
  const subsTable: HTMLElement = createElem('div', 'subscriptions__body');

  SUBSCRIPTION_PLANS.forEach((el, id) => {
    const subsCard: HTMLElement = renderTariffCard(el, id);
    if (id === 1) subsCard.classList.add('tariff-card_active');
    subsTable.append(subsCard);
  });

  mainContent.append(subsTitle, subsTable);

  mainContainer.append(mainContent);
  main.append(mainContainer);

  return main;
};
