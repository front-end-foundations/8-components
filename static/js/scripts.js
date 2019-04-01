document.addEventListener('click', clickHandlers);

function clickHandlers() {
  if (event.target.matches('#pull')) {
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  } else if (event.target.matches('.content-video a')) {
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  } else if (event.target.matches('.image-tn img')) {
    const imageHref = event.target.parentNode.getAttribute('href');
    const titleText = event.target.title;
    document.querySelector('figure img').setAttribute('src', imageHref);
    document.querySelector('figcaption').innerHTML = titleText;
    event.preventDefault();
  }
}

var addContent = function(data) {
  var looped = '';

  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }
  document.querySelector('.content .blog').innerHTML = looped;
};

var getData = function() {
  var nyt =
    'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa';
  fetch(nyt)
    .then(response => response.json())
    .then(json => addContent(json));
};

getData();
