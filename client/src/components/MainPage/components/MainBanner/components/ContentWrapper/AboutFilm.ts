import { createElem } from 'src/utils/create-element';
import { createBtnTrailer, createBtnInterest, createBtnWatch } from 'src/components/ui/Buttons/Buttons';
import { getReadableVotes } from 'src/utils/get-readable-votes';
import { ViewType } from 'src/const/main-page-data';
import { store } from 'src/logic/redux';
import { getReadableDuration } from 'src/utils/get-readable-duration';
import styles from './AboutFilm.module.scss';
import { renderBannerRating } from '../BannerRating/BannerRating';

export const renderAboutFilm = (
  res: ResponseMovie,
  dotsBtn: boolean,
  userReview: {
    data: UserFilmReviewResponse;
    response: Response;
  } | null
): HTMLElement => {
  const { viewType } = store.getState().uiConfig;

  const btnSlice1 = createElem('div', styles.contentWrapper__actions__slice1);
  const btnSlice2 = createElem('div', styles.contentWrapper__actions__slice2);
  const buttons: HTMLElement = createElem('div', styles.contentWrapper__actions);
  const content: HTMLElement = createElem('div', styles.contentWrapper);

  const btnWatch = createBtnWatch(res.id) as HTMLButtonElement;
  const btnTrailer = createBtnTrailer(res) as HTMLButtonElement;
  btnSlice2.append(btnTrailer);

  if (dotsBtn && viewType !== ViewType.CHILD) {
    const btnInterest = createBtnInterest(res.id) as HTMLButtonElement;
    btnSlice2.append(btnInterest);
  }

  const description = res.shortDescription ? res.shortDescription : res.description || '';
  const title =
    res.logo && res.logo.url ? `<img src="${res.logo.url}" alt="${res.name || 'image'}" />` : res.name || '';
  const raiting = res.rating.kp ? res.rating.kp.toFixed(1) : '';
  const votes = res.votes.kp ? getReadableVotes(res.votes.kp) : '';
  const ageRating = res.ageRating ? `${res.ageRating}+` : '';

  const aboutFilmTemplate = `
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
          ${votes}
        </div>
        <div class=${styles.contentWrapper__rating__userVotes}></div>
      </div>
      <div class=${styles.contentWrapper__meta__main}>
        <div class=${styles.contentWrapper__year__genres}>
          <span>${res.year || ''}, ${res.genres[0] && res.genres[0].name ? res.genres[0].name : ''}, ${
    res.genres[1] && res.genres[1].name ? res.genres[1].name : ''
  }</span>
          <span>${res.countries[0] && res.countries[0].name ? res.countries[0].name : ''}</span>
          <span>${res.movieLength ? getReadableDuration(res.movieLength) : ''}</span>
          <span>${ageRating}</span>
        </div>
      </div>
    </div>
  </div>
  <p class=${styles.contentWrapper__short__description}>${description}</p>
  </div>
  `;

  content.innerHTML = aboutFilmTemplate;

  const ratingBlock = content.querySelector('.contentWrapper__rating__userVotes') as HTMLElement;
  if (ratingBlock && userReview && userReview.data.review) {
    const userVote = renderBannerRating(userReview.data.review.stars);
    ratingBlock.innerHTML = '';
    ratingBlock.append(userVote);
  }

  btnSlice1.append(btnWatch);
  buttons.append(btnSlice1, btnSlice2);
  content.append(buttons);

  return content;
};
