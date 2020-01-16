import AnimeThemes from ".";
import Theme from "./theme";
import { IAnimeResponse } from "./responses";

export default class Anime {
    public readonly id: number;
    public readonly title: string;
    public readonly year: number;
    public readonly season: Season;
    public readonly api: AnimeThemes;
    public readonly themes: Theme[];

    constructor(data: IAnimeResponse, api: AnimeThemes) {
        this.id = data.malID;
        this.year = data.year;
        this.season = data.season as Season;
        this.title = data.name;
        this.api = api;
        this.themes = data.themes.map((t) => new Theme(t, this));
    }
}

export enum Season {
    Winter = "Winter",
    Spring = "Spring",
    Summer = "Summer",
    Fall = "Fall",
}
