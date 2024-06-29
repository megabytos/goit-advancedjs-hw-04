import refs from './refs';
import { handlerFormSubmit, handlerLoadMore } from './handlers';

refs.form.addEventListener('submit', handlerFormSubmit);
refs.more.addEventListener('click', handlerLoadMore);
