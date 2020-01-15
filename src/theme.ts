import Anime from "./anime";
import IThemeResponse, { IThemeMirrorResponse } from "./response/theme-response";
import AnimeThemes from ".";

export default class Theme {
    public readonly title: string;
    public readonly url: string;
    public readonly type: ThemeType;
    public readonly number: number;
    public readonly version: number;
    public readonly anime: Anime;
    public readonly api: AnimeThemes;

    constructor(data: IThemeResponse, anime: Anime) {
        this.title = data.themeName;
        this.url = data.mirror.mirrorURL;

        const parts = data.themeType.match(/(OP|ED)(\d)?( V(\d))?/);
        this.type = parts[1] as unknown as ThemeType;
        this.number = (parts[2]) ? parseInt(parts[2], 10) : 1;
        this.version = (parts[4]) ? parseInt(parts[4], 10) : 1;

        this.anime = anime;
        this.api = anime.api;
    }

    public async getMirrors(): Promise<string[]> {
        const response = await this.api.query(`/themes/${this.anime.id}/${this.type}/mirrors`);
        return await response.mirrors.map((mirror: IThemeMirrorResponse) => mirror.mirrorURL);
    }
}

export enum ThemeType {
    OP = "OP",
    ED = "ED",
}
