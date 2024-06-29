export const createMarkup = items => {
  return items
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `      
        <a href="${largeImageURL}" class="item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
        </a>`
    )
    .join('');
}
