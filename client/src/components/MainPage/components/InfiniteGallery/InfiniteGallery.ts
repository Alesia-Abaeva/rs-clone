import { Igallery } from 'src/const/gallery-data';
import { createElem } from 'src/utils/create-element';
import { createPartOfGallery } from 'src/components/MainPage/components/InfiniteGallery/create-gallery-part';
import styles from './InfiniteGallery.module.scss';

export const renderInfiniteGallery = (data: Igallery[]): HTMLElement => {
  const gallery = createElem('div', styles.gallery);
  const wrapper = createElem('div', 'gallery__wrapper');

  createPartOfGallery(data, wrapper);
  createPartOfGallery(data, wrapper);

  gallery.append(wrapper);

  return gallery;
};
