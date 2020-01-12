# anime-themes
A library used for interacting around [Themes.moe](https://themes.moe). This is an unofficial wrapper library and is not affiliated with the said website.

This uses [node-fetch](https://github.com/node-fetch/node-fetch#) for making requests.

* Installation
* Contributing
* Documentation
    * Basic Usage
        * Requiring
        * Getting an anime by title
        * Getting an anime by MyAnimeList ID

## Installation
`> npm install anime-themes`

## Contributing
Fork this repository and run `npm install` to install dependencies and development dependencies.

Run tests with `npm run test` before making any pull requests.

## Documentation
### Basic Usage
#### Requiring
Common JS
```js
const themes = require("anime-themes");
```
ES6
```js
import AnimeThemes from "anime-themes";
```
#### Getting an anime by title
```js
themes.search("Azur Lane")
    .then((anime) => {
        console.log(anime.themes[0].title); // graphite/diamond
    });
```
#### Getting an anime by MyAnimeList ID
```js
themes.search(36633)
    .then((anime) => {
        console.log(anime.title); // Date A Live III
    });
```