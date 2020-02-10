import AnimeThemes from ".";
import Anime, { IAnimeResponse } from "./anime";

export class Season {
    public readonly year: number;
    public readonly season: SeasonType;
    public readonly animes: Anime[];
    public readonly api: AnimeThemes;

    constructor(seasonInfo: SeasonInfo, animeData: IAnimeResponse[]) {
        this.year = seasonInfo.year;
        this.season = seasonInfo.season;
        this.api = seasonInfo.api;

        this.animes = animeData.map((a) => new Anime(a, seasonInfo.api));
    }
}

export class SeasonInfo {
    public readonly year: number;
    public readonly season: SeasonType;
    public readonly api: AnimeThemes;

    constructor(data: ISeasonListItemResponse, api: AnimeThemes) {
        this.year = parseInt(data.year);
        this.season = data.season;
        this.api = api;
    }

    public async getSeason(): Promise<Season> {
        const response = await this.api.query<IAnimeResponse[]>(`/seasons/${this.year}/${this.season}`);
        return new Season(this, response);
    }
}

export type SeasonType = "Winter" | "Spring" | "Summer" | "Fall";

export interface ISeasonListItemResponse {
    year: string;
    season: SeasonType;
}