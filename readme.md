# Components

## Homework

## Exercise

Examine the changes to the site

* gitignore
* pages
* components
* layouts > components
* eleventyignore > ignore
* static

## Deployment

We'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://zealous-kilby-113356.netlify.com/).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start). Here is a [sample](https://agitated-bartik-814348.netlify.com/) with [admin](https://agitated-bartik-814348.netlify.com/admin).

## Install sass

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



## Notes

[JAM stack](https://jamstack.org/)