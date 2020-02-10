import AnimeThemes from ".";
import Anime, { IAnimeResponse } from "./anime";

export default class Artist {
    public readonly slug: string;
    public readonly name: string;
    public readonly animes: Anime[];
    public readonly api: AnimeThemes;

    constructor(data: IArtistListItemResponse, api: AnimeThemes) {
        this.slug = data.artistID;
        this.name = data.artistName;
        this.api = api;
    }

    public async getAnime(): Promise<Anime[]> {
        const response = await this.api.query<IArtistResponse>(`/artists/${this.slug}`);
        return response.themes.map((a) => new Anime(a, this.api));
    }
}

export interface IArtistListItemResponse {
    artistID: string;
    artistName: string;
}

export interface IArtistResponse extends IArtistListItemResponse{
    themes: IAnimeResponse[];
}