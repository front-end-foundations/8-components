# VII - Components

** Download the zip file **

Log in to Github and create an empty repo called components.

## Homework

## Exercise - A Site Redesign

Our hypothetical company has a site the looks outdated and not responsive.

![site](ignore/other/wide.png)

Before beginning, examine the changes to the site from last week.

* .gitignore - now includes the `_site` directory
* pages - instead of post we now have a pages collection
* components - inside the `_includes` directory
* layouts - our `layout.html` file now references the components above
* .eleventyignore - instructs 11ty to not process `readme.md` (this file) and anything in the ignore directory
* static - reorganized assets
* .eleventy.js - passthroughs for images, JS and CSS

I have renamed the pages from last class.

* the ajax page is now called blog
* there is a new videos page
* the `pages.json` file (formerly `posts.json`) now tags all files in the pages folder as follows:

```js
{
	"layout": "layouts/layout.html",
	"tags": ["pages", "nav"]
}
```

## GIT

Initialize the repository

```sh
$ cd <project directory>
$ git init
$ git add .
$ git commit -m 'Initial commit'
```

Create a new Github repo and add the remote origin to the repo following the instructions on Github.

```sh
$ git add <your repo name as per the instructions on Github>
$ git push -u origin master
```

## Deployment

We'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://zealous-kilby-113356.netlify.com/).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start). Here is a [sample](https://agitated-bartik-814348.netlify.com/) with [admin](https://agitated-bartik-814348.netlify.com/admin).

* use the terminal to create and checkout a new branch

```sh
$ git branch dev
$ git checkout dev
```

In the future you will be able to merge your dev branch with the master branch and have your site updated automatically.

## Header

Add the first component to layout.js

```
{% include components/header.html %}
```

```css
header {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 2rem;
}
header h1 {
	font-size: 3rem;
}
header p {
	font-size: 1.25rem;
	text-transform: uppercase;
	line-height: 1.1;
	margin-bottom: 1rem;
}
header h1 + p {
	padding-top: 1rem;
	border-top: 3px double #dbd1b5;
}
header p + p {
	font-size: 1rem;
	line-height: 1.1;
	color: #999;
}
```

## Install sass

Examine the directories in the ignore directory. 

Copy and paste the contents of `syles.css` to `_base.scss`.

```
$ npm i -D sass
```

```js
{
  "name": "eleventy2",
  "version": "1.0.0",
  "description": "## Homework",
  "main": "index.js",
  "scripts": {
    "eleventy": "eleventy --serve",
    "sass": "sass ignore/scss/styles.scss static/css/styles.css --watch --source-map",
    "start": "npm run eleventy & npm run sass"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@11ty/eleventy": "^0.7.1",
    "sass": "^1.17.3"
  }
}
```

Call the sass partial from `styles.scss`

```css
@import 'imports/normalize';
@import 'imports/main';
@import 'imports/base';
```

CSS minifcation?

## Using Live SASS Compiler

If you prefer to use the VS Code plugin [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) for VS Code set the _workspace settings_ as shown:

```js
{
  "liveSassCompile.settings.formats": [
      {
          "savePath": "/_site/static/css/",
          "format": "expanded"
      }
  ],
  "liveSassCompile.settings.excludeList": [
      "**/node_modules/**",
      ".vscode/**",
      "**/other/**"
  ]
}
```

Note the `.vscode` directory that is created for per project settings.

See the full [documentation](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md) for settings.

Click the `Watch Sass` button at the bottom of the editor.

Note: since we are compiling the css directly to the `_site` folder, there is no need for the passthrough in `.eleventy.js`.

## Nesting SASS

Since we are using SASS includes we can delete the base.css and reset.css files from the css directory.

Refactor the css in `_header.scss` file to use nesting.

```css
header {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 2rem;
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.25rem;
    text-transform: uppercase;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
  h1 + p {
    padding-top: 1rem;
    border-top: 3px double #dbd1b5;
  }
  p + p {
    font-size: 1rem;
    line-height: 1.1;
    color: #999;
  }
}
```

Compare the resulting css file with the source sass file. 
Inspect the header in the developer tools and note the *mapping*.

* maps the css line numbers to the scss line numbers
* note the line numbers in the element inspector

### Media Query - Mobile First

Add a media query to hide the header paragraphs on small screens.

Normally this would be written as:

```css
@media (max-width: 780px){
  header p {
    display: none;
  }
}
```

But because we are nesting we can simply write (in `_header.scss`):

```css
p {
  ...
  @media (max-width: 780px){
    display: none;
  }
}
```

Examine the resulting css. 

Examine the mapping.

Note: this is *not* a mobile first design pattern. It uses `max-width` to add display attributes to small screens.

Change it to use a `min-width` mobile first design pattern:

```css
p {
	display: none;
	@media (min-width: 780px){
		display: block;
		font-size: 1.5rem;
		text-transform: uppercase;
		line-height: 1.1;
		margin-bottom: 1rem;
	}
}
```

### Variables

Create and add `_variables.scss` to imports with:

```
$break-sm: 480px;
$break-med: 768px;
$break-wide: 980px;

$max-width: 980px;

$link: #007eb6;
$hover: #df3030;
$text: #333;
$med-gray: #666;
$light-gray: #ddd;
$dk-yellow: #dbd1b5;
```

Import it into `styles.scss`. Be sure to import it first in order to make the variables available to the subsequent imports.

Apply the color and break point variables to `_header.scss`.

## Responsive Main Nav

Note the link `<a href="#" id="pull"></a>` in the nav. We will use this to show a menu on small screens:

```html
  <nav>
    <a href="#" id="pull"></a>
    <ul>
      ...
    </ul>
  </nav>
```

* create a sass partial `_nav.scss` 
* import it into `styles.css` with `@import 'imports/nav';`
* remove all references to nav in `_base.scss`

Small screen - hide the navigation

```css
nav {
	ul {
		display: none;
	}
}
```

Show and format the hamburger menu:

```css
#pull {
  display: block;
  background-color: $link;
  height: 32px;
  padding-top: 12px;
  padding-left: 12px;
}

#pull::after {
  content:"";
  background: url(../img/nav-icon.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: cover; 
  display: inline-block;
}
```

### Large Screen

Add media queries for medium and larger screens

Hide the hamburger on wider screens:

```css
#pull {
	🔥
	@media (min-width: $break-sm) {
		display: none;
	}
}
```

Show the navigation on large screens:

```css
nav ul {
  display: none;
  list-style: none;
  @media (min-width: $break-sm){
    display: flex;
    justify-content: space-between;
    background: $link;
    text-align: center;
  }
}
```

We can't see the anchor tags (because they are the same color as the navbar) or the active state:

```css
nav li {
  padding: 1rem;
}
nav a {
  color: #fff;
}

nav .active a {
  font-weight: bold;
}
```

Note - `space-around` is probably a better choice for the ul formatting here.

Format the list items (horizontal display) and add a hover effect using SASS ampersand notation:

```css
nav li {
  padding: 1rem;
  @media (min-width: $break-sm){
    flex-grow: 1;
    &:hover {
      background-color: darken( $link, 10% );
    }
  }
}
```

Note the use of flex-grow to allow the li's to expand. Note that the hover effect is not clickable.

```css
nav li {
  // padding: 1rem;
  @media (min-width: $break-sm){
    flex-grow: 1;
    &:hover {
      background-color: darken( $link, 10% );
    }
  }
}

nav a {
  padding: 1rem;
  color: #fff;
  @media (min-width: $break-sm){
    display: block;
  }
}

nav .active {
  background-color: darken( $link, 10% );
}
```

Don't like the hover on an active tab?

```css
nav li {
  @media (min-width: $break-sm){
    flex-grow: 1;
    &:hover:not(.active) {
      background-color: lighten( $link, 10% );
    }
  }
}
```

### Show/Hide Nav

Edit our scripts:

```js
var hamburger = document.querySelector('#pull')
var body = document.querySelector('body')

hamburger.addEventListener('click', showMenu)

function showMenu(){
  body.classList.toggle('show-nav')
  event.preventDefault();
}
```

or

```js
function clickHandlers(){
  console.log(event.target)
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  // event.preventDefault();
}
```

Add a .showme class to the `_navigation.scss`:

```css
.show-nav nav ul {
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 100%;
}
```

<!-- Decorate the list items in the default small screen view:

```css
nav {
	🔥
	li {
		background: $light-gray;
		border-bottom: 1px solid #fff;
		@media (min-width: $break-sm){
			flex-grow: 1;
			background: $link;
			&:hover {
				background: $text;
			}
		}
	}
	🔥
}
``` -->

<!-- Also, make the menu items extra easy to click on mobile:

```css
.show-nav nav ul {
	🔥
	li {
		padding: 1rem;
	}
}
``` -->

Check the navigation on both sizes and make adjustments as necessary.

```css
nav {
  background-color: $link;
}
nav ul {
  display: none;
  list-style: none;
  background-color: $link;
  @media (min-width: $break-med){
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
}

nav li {
  padding: 1rem;
  &:hover:not(.active) {
    background-color: lighten( $link, 10% );
  }
  @media (min-width: $break-med){
    padding: 0;
    flex-grow: 1;
  }
}

nav a {
  padding: 1rem;
  color: #fff;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: $break-med){
    display: block;
  }
  &:hover {
    text-decoration: none;
  }
}

nav .active {
  background-color: darken( $link, 10% );
}

nav .active a {
  font-weight: bold;
}

#pull {
  display: block;
  background-color: $link;
  padding-top: 12px;
  padding-left: 12px;
  @media (min-width: $break-med) {
    display: none;
  }
}

#pull::after {
  content:"";
  background: url(../img/nav-icon.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: cover; 
  display: inline-block;
}

.show-nav nav ul {
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 100%;
}
```

## Video Component



```html
<section id="videos">
<article>
{% include components/video.html %}
</article>
</section>
```

Format the video and buttons in `_video.scss`:

```css
.content-video {
	iframe {
    background: #222;
    padding: 1rem;
  }
	.btn-list {
		padding: 6px;
		display: flex;
		li {
			margin: 1rem;
		}
		.active {
			border-radius: 4px;
			background: $link;
			color: #fff;
			padding: 0.5rem;
		}
	}
}
```

```css
img,
iframe {
  width: 100%;
}

ul {
  list-style: none;
}
```

Create variables and spread the links into an array.

```js
// Video switcher
const videoLinks = document.querySelectorAll('.content-video a');

videoLinks.forEach(videoLink =>
	videoLink.addEventListener('click', function() {
    console.log(event.target);
		event.preventDefault();
	})
);
```

Examine the `videoLinks` nodelist in the console.

Add a `selectVideo` function:

```js
const videoLinks = document.querySelectorAll('.content-video a');
videoLinks.forEach(videoLink => videoLink.addEventListener('click', selectVideo));

function selectVideo() {
	console.log(this);
	event.preventDefault();
}
```

Examine the nodelist in the console.

Note that you can create a true Array from it by declaring a new variable and spreading the contents on the nodeList into it:

`videoLinksArray = [...videoLinks]`

or, for maximum compatibility:

`const videoLinks = Array.from(document.querySelectorAll('.content-video a'));`

Isolate the `href` value:

```js
const videoLinks = Array.from(document.querySelectorAll('.content-video a'));

videoLinks.forEach(videoLink =>
	videoLink.addEventListener('click', selectVideo)
);

function selectVideo() {
	const videoToPlay = this.getAttribute('href');
	console.log(videoToPlay);
	event.preventDefault();
}
```

### Updating the Video

Add a variable for the iFrame:

`const iFrame = document.querySelector('iframe')`

and set its src attribute:

`iFrame.setAttribute('src', videoToPlay)`:

```js
const iFrame = document.querySelector('iframe'); // NEW
const videoLinks = document.querySelectorAll('.content-video a');
videoLinks.forEach(videoLink => videoLink.addEventListener('click', selectVideo));

function selectVideo() {
	const videoToPlay = this.getAttribute('href');
	iFrame.setAttribute('src', videoToPlay); // NEW
	console.log(iFrame); // NEW
	event.preventDefault();
}
```

Switch the active class:

```js
const iFrame = document.querySelector('iframe');
const videoLinks = document.querySelectorAll('.content-video a');
videoLinks.forEach(videoLink => videoLink.addEventListener('click', selectVideo));

function selectVideo() {
	removeActiveClass(); // NEW
	this.classList.add('active'); // NEW
	const videoToPlay = this.getAttribute('href');
	iFrame.setAttribute('src', videoToPlay);
	event.preventDefault();
}

// NEW

function removeActiveClass() {
	videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
}
```

Plug into event delegation:

```js
function clickHandlers(){
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  }
}
```

Make an aside

```html
<section id="videos">
<article>
{% include components/video.html %}
</article>
<aside>
{% include components/video-aside.html %}
</aside>
</section>
```

```css
section {
  @media(min-width: $break-med){
    max-width: $max-width;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-column-gap: 2rem;
    padding-top: 2rem;
    article {
      iframe {
        min-height: 300px;
      }
    }
  }
}
```


```css
.content-video {
	iframe {
    background: #222;
  }
	.btn-list {
		padding: 6px;
		display: flex;
		li {
			margin: 1rem;
		}
		.active {
			border-radius: 4px;
			background: $link;
			color: #fff;
			padding: 0.5rem;
		}
	}
}
```

We want the video section to appear on onkly the home page and in the video page.

Create home.html and video.html from the layout.html template.

Use these templates for rendering e.g.:

```yaml
---
layout: layouts/home.html
pageTitle: Home
tags:
  - nav
navTitle: Home
date: 2010-01-01
permalink: /
---
```

Remove the article section from layout.html

Thinning the templates

The videos.md markdown file:

```md
---
layout: layouts/video.html
pageTitle: Videos
navTitle: Videos
date: 2019-01-01
---

Insisting that they had taken every measure to keep the message “extra top secret,” the Trump boys reportedly spent Wednesday defending their decision to send Saudi Arabia plans for a cool missile using their personal Etch A Sketch. “We spent, like, a million hours making that rocket look super good, so we had to send it to our friends in Sunny Arabia…

[Home](/)
```

The video.html template:

```
---
layout: layouts/layout.html
---

<section id="videos">
<article>
{% include components/video.html %}
</article>
<aside>
{% include components/video-aside.html %}
</aside>
</section>

```

The layout template:

```html
<!DOCTYPE html>
<html lang="en">

{% include components/head.html %}

<body class="{{ pageClass }}">

{% include components/nav.html %}

{% include components/header.html %}

<div class="content">

    <h1>{{ pageTitle }}</h1>

    {{ content }}
    
</div>

<script src="/static/js/scripts.js" ></script>

</body>
</html>
```

Trim the home.html template

```html
---
layout: layouts/layout.html
---

<section id="videos">
<article>
{% include components/video.html %}
</article>
<aside>
{% include components/video-aside.html %}
</aside>
</section>

<div class="content">

    <h1>{{ pageTitle }}</h1>

    {{ content }}
    
</div>
```

Final trim

New video-section.html in components:

```html
<section id="videos">
<article>
{% include components/video.html %}
</article>
<aside>
{% include components/video-aside.html %}
</aside>
</section>
```

Then home.html layout

```html
---
layout: layouts/layout.html
---

{% include components/video-section.html %}

<div class="content">

    <h1>{{ pageTitle }}</h1>

    {{ content }}
    
</div>
```

Then video.html layout

```html
---
layout: layouts/layout.html
---

{% include components/video-section.html %}

{{ content }}
```

### Image Carousel

Do a DOM review of this section of the page.

In `_carousel.scss`:

```css
.secondary aside {
	ul {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		li {
			flex-basis: 28%;
			margin: 2px;
			padding: 4px;
			background-color: #fff;
			border: 1px solid $dk-yellow;
			transition: all 0.2s linear;
			&:hover {
				transform: scale(1.1);
				box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
			}
		}
	}
}
```

Note transition:

```css
li img {
	...
	transition: all 0.2s linear;
	&:hover {
		transform: scale(1.1);
		box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
	}
```

# Content Slider 

Examine the main image HTML. Improve it with HTML 5 tags `figure` and `figcaption`.

```css
figure {
	position: relative;
	figcaption {
		padding: 6px;
		background: rgba(255, 255, 255, 0.7);
		position: absolute;
		bottom: 0;
	}
}
```

## Notes

js ajax and localstorage

At a certain point I had to adjust the js to remove an error.

```
---
pageClass: blog
pageTitle: Blog
date: 2019-03-01
navTitle: Blog
---

<div class="blog"></div>
```

```js
document.addEventListener('click', clickHandlers)

var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

function clickHandlers(){
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  }
}

var addContent = function(data){

  var looped = ''

  for(i=0; i<data.results.length; i++){
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `
  }
  if (document.querySelector('.content .blog')){
    document.querySelector('.content .blog').innerHTML = looped
  }
}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => addContent(json))
}

getData();
```