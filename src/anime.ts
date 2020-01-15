import IAnimeResponse from "./response/anime-response";
import IThemeResponse from "./response/theme-response";
import AnimeThemes from ".";
import Theme from "./theme";

export default class Anime {
    public readonly id: number;
    public readonly title: string;
    public readonly year: number;
    public readonly season: AnimeSeason;
    public readonly api: AnimeThemes;
    public readonly themes: Theme[];

    constructor(data: IAnimeResponse, api: AnimeThemes) {
        this.id = data.malID;
        this.year = data.year;
        this.title = data.name;
        this.api = api;
        this.themes = data.themes.map((t: IThemeResponse) => new Theme(t, this));
    }
}

export enum AnimeSeason {
    Winter = "Winter",
    Spring = "Spring",
    Summer = "Summer",
    Fall = "Fall",
}
