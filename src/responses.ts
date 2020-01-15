export interface IAnimeResponse {
    malID: number;
    name: string;
    year: number;
    season: string;
    themes: IAnimeThemeResponse[];
}

export interface IAnimeThemeResponse {
    themeType: string;
    themeName: string;
    mirror: IThemeMirrorResponse;
}

export interface IThemeResponse {
    themeType: string;
    themeName: string;
    mirrors: IThemeMirrorResponse[];
}

export interface IThemeMirrorResponse {
    mirrorURL: string;
    priority: number;
    notes: string;
}
