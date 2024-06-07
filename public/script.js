document.getElementById('scrapeButton').addEventListener('click', async () => {
  const keyword = document.getElementById('keyword').value;
  const response = await fetch(`/api/scrape?keyword=${keyword}`);
  const data = await response.json();

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Limpar resultados anteriores

  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const title = document.createElement('h2');
    title.textContent = item.title;
    itemDiv.appendChild(title);

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${item.rating}`;
    itemDiv.appendChild(rating);

    const reviews = document.createElement('p');
    reviews.textContent = `Reviews: ${item.reviews}`;
    itemDiv.appendChild(reviews);

    const image = document.createElement('img');
    image.src = item.image;
    itemDiv.appendChild(image);

    const link = document.createElement('a');
    link.href = item.link;
    link.textContent = 'View Product';
    link.target = '_blank';
    itemDiv.appendChild(link);

    resultsDiv.appendChild(itemDiv);
  });
});
