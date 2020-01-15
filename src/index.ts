import Anime from "./anime";
import IAnimeResponse from "./response/anime-response";
import fetch, { RequestInit } from "node-fetch";

export default class AnimeThemes {
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

    public async query<T>(path: string, options?: RequestInit): Promise<T> {
        return await (await fetch(this.host + path, { ...this.options, ...options })).json();
    }
}

export interface IAnimeThemesOptions {
    host: string;
    userAgent?: string;
}
