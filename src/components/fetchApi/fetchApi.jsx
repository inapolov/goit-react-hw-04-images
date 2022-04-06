const KEY = '24700389-41a6c20aad42dc08b671c5623';

export default async function fetchApi(imageRequest, page) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${imageRequest}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

