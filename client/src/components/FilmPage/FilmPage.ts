import { createElem } from 'src/utils/create-element';
import { store } from 'src/logic/redux';
import { ViewType } from 'src/const/main-page-data';
import { renderPersons } from './components/Persons/Persons';
import { renderBackgroundPlayer } from './components/BackgroundPlayer/BackgroundPlayer';
import { renderFilmDataTable } from './components/FilmDataTable/FilmDataTable';
import { renderRating } from './components/Rating/Rating';
import { getPersonsWithJob } from './Handlers/film-data-formaters';
import { renderSimilarMovies } from './components/SimilarMovies/SimilarMovies';
import { showCover } from './Handlers/showCover';
import { createBtnInterest, createBtnTrailer, createBtnWatch } from '../ui/Buttons/Buttons';
import { renderModal } from '../ui/ModalFilm/ModalFilm';
import styles from './FilmPage.module.scss';
import { renderReviewForm } from './components/ReviewForm/ReviewForm';
import { renderFilmReviews } from './components/FilmReviews/FilmReviews';
import { renderChildrenProtection } from './components/ChildrenProtection/ChildrenProtection';
import { toggleScroll } from '../ui/Modal/no-scroll-on';

export const renderFilmPage = (filmData: ResponseMovie): HTMLElement => {
  const { viewType } = store.getState().uiConfig;
  const main: HTMLElement = createElem('main', 'main');

  if ((Number(filmData.ageRating) > 12 || filmData.ageRating === null) && viewType === ViewType.CHILD) {
    const protectionScreen: HTMLElement = renderChildrenProtection();
    toggleScroll();
    main.append(protectionScreen);
  } // редирект для детского режима

  const mainContainer: HTMLElement = createElem('div', 'main__container');
  const mainContent: HTMLElement = createElem('div', styles['film-page']);
  mainContent.classList.add('id-page');
  const backdrop: HTMLElement = createElem('div', 'id-page__backdrop');

  const { container } = renderModal(); // в модалке рендерится iframe только после нажатия кнопки

  if (window.screen.width > 1000)
    renderBackgroundPlayer(filmData, 'video-player', showCover(filmData, backdrop, mainContent));
  else showCover(filmData, backdrop, mainContent)();

  // 1 column - poster
  const filmPoster: HTMLElement = createElem('img', 'id-page__poster');
  const url = `${
    filmData.poster
      ? filmData.poster.url
      : 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
  }`;
  filmPoster.setAttribute('src', url);
  filmPoster.classList.add('skeleton');

  // 2 column - film data
  const filmDescription: HTMLElement = createElem('div', 'id-page__description');
  const filmHeader: HTMLElement = createElem('div', 'id-page__header');
  const filmTitle: HTMLElement = createElem('h1', 'id-page__title');

  const year = filmData.year ? `(${filmData.year})` : '';
  filmTitle.innerHTML = `${filmData.name} ${year}`;

  const enName = filmData.alternativeName ? `${filmData.alternativeName}` : '';
  const filmEnTitle: HTMLElement = createElem('div', 'id-page__sub-title');
  const age = filmData.ageRating;
  filmEnTitle.innerHTML = `${enName} ${age ? `${age}+` : ''}`;

  filmHeader.append(filmTitle, filmEnTitle);

  const actionBtns: HTMLElement = createElem('div', 'id-page__action');
  const btnWatch = createBtnWatch(filmData.id);
  const trailerBtn = createBtnTrailer(filmData);

  actionBtns.append(btnWatch, trailerBtn);
  if (viewType !== ViewType.CHILD) {
    const btnInterest = createBtnInterest(filmData.id);
    actionBtns.append(btnInterest);
  }

  const shortDescription: HTMLElement = createElem('div', 'id-page__short-desc');
  const shortDescriptionText: HTMLElement = createElem('p', 'id-page__desc-text');
  shortDescriptionText.innerHTML = filmData.shortDescription;
  shortDescription.append(shortDescriptionText);

  const filmAbout: HTMLElement = renderFilmDataTable(filmData);
  filmDescription.append(filmHeader, actionBtns, shortDescription, filmAbout);

  const longDescription = filmData.description;
  if (longDescription) {
    const filmLongDesc: HTMLElement = createElem('div', 'id-page__long-desc');
    const longDescTitle: HTMLElement = createElem('h2', 'id-page__about-title');
    longDescTitle.innerHTML = 'Описание';
    const longDescText: HTMLElement = createElem('p', 'id-page__desc-text');
    longDescText.innerHTML = longDescription;
    filmLongDesc.append(longDescTitle, longDescText);
    filmDescription.append(filmLongDesc);
  }

  const { similarMovies } = filmData;
  if (similarMovies.length !== 0 && similarMovies[0].name) {
    const simiralMoviesSection: HTMLElement = renderSimilarMovies(similarMovies);
    filmDescription.append(simiralMoviesSection);
  }

  if (viewType !== ViewType.CHILD) {
    const reviewForm: HTMLElement = renderReviewForm(filmData);
    filmDescription.append(reviewForm);

    const reviewsCont: HTMLElement = createElem('div', 'reviews-cont');
    reviewsCont.id = 'review-cont';

    const reviews: HTMLElement = renderFilmReviews(filmData.id);
    reviewsCont.append(reviews);

    filmDescription.append(reviewsCont);
  }

  // 3 column - actors and rating
  const filmRatingAndActors = createElem('div', 'id-page__desc-aside');

  const rating: HTMLElement = renderRating(filmData.rating.kp);
  filmRatingAndActors.append(rating);

  const actors = getPersonsWithJob(filmData.persons, 'actor');
  if (actors.length !== 0) {
    const actorsSection = renderPersons('В главных ролях:', actors);
    filmRatingAndActors.append(actorsSection);
  }
  const voiceActors = getPersonsWithJob(filmData.persons, 'voice_actor');
  if (voiceActors.length !== 0) {
    const voiceActorsSection = renderPersons('Роли дублировали:', voiceActors);
    filmRatingAndActors.append(voiceActorsSection);
  }

  mainContent.append(filmPoster, filmDescription, filmRatingAndActors);
  mainContainer.append(backdrop, mainContent);
  main.append(mainContainer, container);

  return main;
};
