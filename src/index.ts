import Anime from "./anime";
import IAnimeResponse from "./response/anime-response";
import fetch, { RequestInit } from "node-fetch";

export default class AnimeThemes {
    public readonly host: string;

    constructor(options: IAnimeThemesOptions = { host: "https://themes.moe/api" }) {
        this.host = options.host;
    }

    public async search(title: string): Promise<Anime[]> {
        title = title.replace(/!/g, "%21");
        const search = await this.query(`/anime/search/${title}`);
        const response = await this.query("/themes/search", { method: "POST", body: JSON.stringify(search) });
        return response.map((item: IAnimeResponse) => new Anime(item, this));
    }

    public async fetch(id: number): Promise<Anime> {
        const response = await this.query(`/themes/${id}`);
        return new Anime(response[0], this);
    }

    public async query(path: string, options?: RequestInit) {
        return await (await fetch(this.host + path, options)).json();
    }
}

export interface IAnimeThemesOptions {
    host: string;
}
