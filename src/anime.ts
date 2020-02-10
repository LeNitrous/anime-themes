import AnimeThemes from ".";
import Theme, { IThemeBaseResponse, IThemeMirrorResponse } from "./theme";
import { SeasonType, SeasonInfo, Season } from "./season";

export default class Anime {
    public readonly id: number;
    public readonly title: string;
    public readonly season: SeasonInfo;
    public readonly themes: Theme[];
    public readonly api: AnimeThemes;

    constructor(data: IAnimeResponse, api: AnimeThemes) {
        this.id = data.malID;
        this.season = new SeasonInfo({ year: data.year.toString(), season: data.season }, api);
        this.title = data.name;
        this.api = api;
        this.themes = data.themes.map((t) => new Theme(t, this));
    }
}

export interface IAnimeResponse {
    malID: number;
    name: string;
    year: number;
    season: SeasonType;
    themes: IAnimeThemeResponse[];
}

export interface IAnimeThemeResponse extends IThemeBaseResponse {
    mirror: IThemeMirrorResponse;
}
