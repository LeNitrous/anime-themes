import { IAnimeThemeResponse } from "./theme-response";

export default interface IAnimeResponse {
    malID: number;
    name: string;
    year: number;
    season: string;
    themes: IAnimeThemeResponse[];
}
