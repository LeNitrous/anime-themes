import Anime, { IAnimeResponse } from "./anime";
import fetch, { RequestInit } from "node-fetch";
import { SeasonInfo, ISeasonListItemResponse, SeasonType, Season } from "./season";
import Artist, { IArtistListItemResponse } from "./artist";

class AnimeThemes {
    public readonly host: string;
    private readonly options: RequestInit;

    constructor(options: IAnimeThemesOptions = { host: "https://themes.moe/api" }) {
        this.host = options.host;
        this.options = {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip,deflate,br",
                "Content-Type": "application/json",
                "Transfer-Encoding": "chunked",
                "User-Agent":  options.userAgent || `anime-themes/${require("../package.json").version} (+https://github.com/LeNitrous/anime-themes)`,
            },
        };
    }

    public async search(title: string): Promise<Anime[]> {
        title = title.replace(/!/g, "%21");
        const search = await this.query<number[]>(`/anime/search/${title}`);
        const response =
            await this.query<IAnimeResponse[]>("/themes/search", { method: "POST", body: JSON.stringify(search) });
        return response.map((item) => new Anime(item, this));
    }

    public async getAnime(id: number): Promise<Anime> {
        const response = await this.query<IAnimeResponse>(`/themes/${id}`);
        return new Anime(response[0], this);
    }

    public async getArtists(): Promise<Artist[]> {
        const response = await this.query<IArtistListItemResponse[]>("/artists");
        return response.map((item) => new Artist(item, this));
    }

    public async getSeasons(): Promise<SeasonInfo[]> {
        const response = await this.query<ISeasonListItemResponse[]>("/seasons");
        return response.map((item) => new SeasonInfo(item, this));
    }

    public async getSeason(year: number, season: SeasonType): Promise<Season> {
        const response = await this.query<IAnimeResponse[]>(`/seasons/${year}/${season}`);
        return new Season(new SeasonInfo({ year: year.toString(), season: season }, this), response);
    }

    public async getYears(): Promise<number[]> {
        const response = await this.query<string[]>("/years");
        return response.map((item) => parseInt(item));
    }

    public async getYear(year: number): Promise<Anime[]> {
        const response = await this.query<IAnimeResponse[]>(`/seasons/${year}`);
        return response.map((item) => new Anime(item, this));
    }

    public async getSongCount(): Promise<number> {
        const response = await this.query<ISongCountResponse>("/songcount");
        return response.count;
    }

    public async query<T>(path: string, options?: RequestInit): Promise<T> {
        return await (await fetch(this.host + path, { ...this.options, ...options })).json();
    }
}

interface IAnimeThemesOptions {
    host: string;
    userAgent?: string;
}

interface ISongCountResponse {
    count: number;
}

export = AnimeThemes;
