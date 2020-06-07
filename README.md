# anime-themes
![GitHub](https://img.shields.io/github/license/lenitrous/anime-themes?color=blue&style=flat-square) ![npm](https://img.shields.io/npm/v/anime-themes?style=flat-square) ![GitHub Action (Tests)](https://github.com/lenitrous/anime-themes/workflows/Tests/badge.svg) ![GitHub Action (Lint)](https://github.com/lenitrous/anime-themes/workflows/Lint/badge.svg)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W71CF9V)

A library used for interacting around [Themes.moe](https://themes.moe). This is an unofficial wrapper library and is not affiliated with the said website.

This uses [node-fetch](https://github.com/node-fetch/node-fetch#) for making requests.

* [Installation](#Installation)
* [Contributing](#Contributing)
* [Documentation](#Documentation)
    * [Basic Usage](#Basic-Usage)
        * [Requiring](#Requiring)
        * [Getting an anime by title](Getting-an-anime-by-title)
        * [Getting an anime by MyAnimeList ID](Getting-an-anime-by-MyAnimeList-ID)

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