import refs from './refs';
import { fetchImages } from './api';
import { createMarkup } from './markups';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const showElement = elm => elm.classList.remove('visually-hidden');
const hideElement = elm => elm.classList.add('visually-hidden');
let currentQuery = '';
let currentPage = 1;
let perPage = 40;

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const handlerFormSubmit = async event => {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  hideElement(refs.more);
  showElement(refs.loader);

  const query = event.target.elements.searchQuery.value.trim().toLowerCase();
  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    hideElement(refs.loader);
    return;
  }

  currentQuery = query;
  currentPage = 1;

  try {
    const { totalHits, hits } = await fetchImages(currentQuery, currentPage, perPage);
    if (totalHits) iziToast.info({ message: `Hooray! We found ${totalHits} images` });
    updateGallery(hits, totalHits);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideElement(refs.loader);
  }
};

export const handlerLoadMore = async () => {
  currentPage += 1;
  showElement(refs.loader);
  try {
    const { totalHits, hits } = await fetchImages(currentQuery, currentPage, perPage);
    updateGallery(hits, totalHits);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideElement(refs.loader);
  }
};

function updateGallery(hits, totalHits) {
  hideElement(refs.more);
  if (hits.length === 0) {
    iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again.' });
    return;
  }
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  lightBox.refresh();
  if (currentPage * perPage >= totalHits) {
    if (currentPage > 1) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results" });
    }
  } else {
    showElement(refs.more);
  }
}
