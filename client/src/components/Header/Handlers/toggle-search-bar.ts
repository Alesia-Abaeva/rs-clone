export const toggleSearchBar = (): void => {
  const search = document.querySelector('.search-btn') as HTMLElement;
  search.classList.toggle('search-btn_open');

  const icon = search.querySelector('.search-btn__icon') as HTMLElement;
  icon.classList.toggle('hidden');

  const input = document.getElementById('search-input') as HTMLInputElement;
  input.classList.toggle('search__input_open');
  input.value = '';
  input.focus();

  const close = document.querySelector('.search__close') as HTMLElement;
  close.classList.toggle('search__close_open');

  const searchBox = document.querySelector('.search__box-container') as HTMLElement;
  searchBox.classList.toggle('search__box-container_open');
};
