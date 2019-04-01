// const carouselLinks = document.querySelectorAll('.image-tn a');
// const carouselLinksArray = [...carouselLinks];
// const carousel = document.querySelector('figure img');
// const carouselPara = document.querySelector('figcaption');

// carouselLinksArray.forEach(carouselLink =>
//   carouselLink.addEventListener('click', runCarousel),
// );

// function runCarousel() {
//   const imageHref = event.target.parentNode.getAttribute('href');
//   console.log(imageHref);
//   const titleText = event.target.title;
//   console.log(titleText);
//   carousel.setAttribute('src', imageHref);
//   carouselPara.innerHTML = titleText;
//   event.preventDefault();
// }

document.addEventListener('click', clickHandlers);

function clickHandlers() {
  if (event.target.matches('#pull')) {
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')) {
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  }
  if (event.target.matches('.image-tn a')) {
    console.log(event.target);
    // const imageHref = event.target.parentNode.getAttribute('href');
    // console.log(imageHref);
    // const titleText = event.target.title;
    // document.querySelector('figure img').setAttribute('src', imageHref);
    // document.querySelector('figcaption').innerHTML = titleText;
    event.preventDefault();
  }
  // else event.preventDefault();
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
