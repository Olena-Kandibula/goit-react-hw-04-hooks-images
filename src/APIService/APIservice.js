const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "22960570-8de4834e5e1a62c8570402763";

function fetchImg(searchQuery, page) {
  console.log(page);
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  return (
    fetch(url)
      .then((response) => response.json())

      // .then((data) => data)
      .then((data) => {
        page += 1;
        return data;
      })

      .catch((error) => console.worm(error))
  );
}

const api = { fetchImg };

export default api;
