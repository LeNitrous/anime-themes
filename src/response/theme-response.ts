export default interface IThemeResponse {
    themeType: string;
    themeName: string;
    mirror: IThemeMirrorResponse;
}

export interface IThemeMirrorResponse {
    mirrorURL: string;
    priority: number;
    notes: string;
}
