import { createElem } from 'src/utils/create-element';
import { getReadableVotes, getReadableDuration } from 'src/utils/get-readable-data';
import { btnWatch, btnTrailer, btnBookmark, btnInterest } from '../buttons/buttons';
import styles from './ContentWrapper.module.scss';

export const renderContentWrapper = async (res: ResponseMovie): Promise<HTMLElement> => {
  const buttons: HTMLElement = createElem('div', styles.contentWrapper__actions);
  const content: HTMLElement = createElem('div', styles.contentWrapper);

  const description = res.shortDescription ? res.shortDescription : res.description;
  const title = res.logo.url ? `<img src="${res.logo.url}" alt="${res.name}" />` : res.name;
  const raiting = res.rating.kp ? res.rating.kp.toFixed(1) : 0;
  const votes = res.votes.kp ? getReadableVotes(res.votes.kp) : 0;
  const ageRating = res.ageRating ? `${res.ageRating}+` : '';

  const contentTemplate = `
  <div class=${styles.contentWrapper__title}>
    <h1>${title}</h1>
  </div>
  <div class=${styles.contentWrapper__body}>
  <div class=${styles.contentWrapper__meta}>
    <div class=${styles.contentWrapper__meta__base}>
      <div class=${styles.contentWrapper__rating}>
        <div class=${styles.contentWrapper__rating__value}>
          ${raiting}
        </div>
        <div class=${styles.contentWrapper__rating__votes}>
        ${votes}K
        </div>
      </div>
      <div class=${styles.contentWrapper__meta__main}>
        <div class=${styles.contentWrapper__year__genres}>
          <span>${res.year},${res.genres[0].name},${res.genres[1].name}</span>
          <span>${res.countries[0].name}</span>
          <span>${getReadableDuration(res.movieLength)}</span>
          <span>${ageRating}</span>
        </div>
      </div>
    </div>
  </div>
  <p class=${styles.contentWrapper__short__description}>${description}</p>
  </div>
  `;

  content.innerHTML = contentTemplate;
  buttons.append(btnWatch, btnTrailer, btnBookmark, btnInterest);
  content.append(buttons);

  return content;
};
