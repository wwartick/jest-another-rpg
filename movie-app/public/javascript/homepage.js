async function addMovie(event) {
  event.preventDefault();

  const user_id = document.querySelector('#user_id').innerHTML.trim();
  const title = document.querySelector('#title').innerHTML.trim();

  const response = await fetch('/api/movies', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      user_id
    })
  });

  if (response.ok) {
    console.log('success!');
  } else {
    document.location.replace('/login');
  }
}

async function homeFormHandler(event) {
  event.preventDefault();

  const genre = document.querySelector('#genre').value.trim();
  const era = document.querySelector('#era').value.trim();

  const response = await fetch('/api/generate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      genre,
      era
    })
  });

  //console.log(genre, era);

  const data = await response.json();
  console.log(data.result[0].text);

  const suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';

  const spanEl = document.createElement('span');
  spanEl.setAttribute('id', 'title');
  spanEl.classList.add('text-light', 'font-weight-bold', 'pr-3', 'movie-text');
  spanEl.innerHTML = data.result[0].text;
  suggestions.appendChild(spanEl);
  
  const addButton = document.createElement('button');
  addButton.classList.add('btn', 'bg-success', 'text-light');
  addButton.innerHTML = 'Add Movie';
  suggestions.appendChild(addButton);
  addButton.addEventListener('click', addMovie);
};

document.querySelector('#home-form').addEventListener('submit', homeFormHandler);