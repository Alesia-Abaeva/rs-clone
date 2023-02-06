import { createElem } from 'src/utils/create-element';
import { getFilmFields } from 'src/components/FilmPage/Handlers/film-data';
import { renderYouTubePlayer } from '../YouTubePlayer/YouTubePlayer';
import { showCover } from './Handlers/showCover';
import { createButton } from '../ui/Button/Button';
import styles from './FilmPage.module.scss';

export const renderFilmPage = (filmData: ResponseMovie): HTMLElement => {
  const main: HTMLElement = createElem('main', 'main');
  const mainContainer: HTMLElement = createElem('div', 'main__container');
  const mainContent: HTMLElement = createElem('div', styles['film-page']);
  const backdrop: HTMLElement = createElem('div', 'film-page__backdrop');

  const trailer = filmData.videos.trailers;
  if (trailer && trailer.length !== 0) {
    renderYouTubePlayer(
      'video-player',
      `${trailer[0].url}?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1`,
      10,
      25,
      showCover(filmData, backdrop),
      showCover(filmData, backdrop)
    );
  }

  console.log(filmData);

  // TODO: ADD placeholders
  // 1 column - poster
  const filmPoster: HTMLElement = createElem('img', 'film-page__poster');
  filmPoster.setAttribute('src', filmData.poster.url);

  // 2 column - film data
  const filmDescription: HTMLElement = createElem('div', 'film-page__description');
  const filmHeader: HTMLElement = createElem('div', 'film-page__header');
  const filmTitle: HTMLElement = createElem('h1', 'film-page__title');

  const year = filmData.year ? `(${filmData.year})` : '';
  filmTitle.innerHTML = `${filmData.name} ${year}`;

  const enName = filmData.alternativeName ? `${filmData.alternativeName}` : '';
  const filmEnTitle: HTMLElement = createElem('div', 'film-page__sub-title');
  const age = filmData.ageRating;
  filmEnTitle.innerHTML = `${enName} ${age ? `${age}+` : ''}`;

  filmHeader.append(filmTitle, filmEnTitle);

  const actionBtns: HTMLElement = createElem('div', 'film-page__action');
  const wantToWatchBtn: HTMLElement = createButton('Буду смотреть', undefined, 'film-page__action-want-to-watch');
  const moreActionsBtn: HTMLElement = createButton('', undefined, 'film-page__action-more');

  actionBtns.append(wantToWatchBtn, moreActionsBtn);

  const filmAbout: HTMLElement = createElem('div', 'film-page__about');
  const aboutTitle: HTMLElement = createElem('h2', 'film-page__about-title');
  aboutTitle.innerHTML = 'О фильме';

  const aboutTable: HTMLElement = createElem('div', 'film-page__about-table');
  aboutTable.classList.add('about-table');

  const formatedData = getFilmFields(filmData);
  formatedData.forEach((el) => {
    if (el.fieldName) {
      const row: HTMLElement = createElem('div', 'about-table__row');
      const rowTitle: HTMLElement = createElem('div', 'about-table__row-title');
      rowTitle.innerHTML = el.title;

      const rowContent: HTMLElement = createElem('div', 'about-table__row-content');
      rowContent.innerHTML = el.fieldName.toString();
      row.append(rowTitle, rowContent);

      aboutTable.append(row);
    }
  });

  filmAbout.append(aboutTitle, aboutTable);

  filmDescription.append(filmHeader, actionBtns, filmAbout);

  mainContent.append(filmPoster, filmDescription);
  mainContainer.append(backdrop, mainContent);
  main.append(mainContainer);

  return main;
};
