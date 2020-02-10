import Anime from "../src/anime";
import AnimeThemes from "../src";
import Theme from "../src/theme";
import chai from "chai";
import chaiArray from "chai-arrays";
import nock from "nock";
import { Season, SeasonInfo } from "../src/season";
import Artist from "../src/artist";

chai.use(chaiArray);

const expect = chai.expect;
const api = new AnimeThemes();

const dummy = {
    anime: require("./dummy/anime.json"),
    search: require("./dummy/search.json"),
    theme: require("./dummy/theme.json"),
    count: { "count": 1 },
    seasons: [{ "year": "2020", "season": "Winter" }],
    artists: [{ "artistID": "mayn", "artistName": "May'n" }],
    artist: require("./dummy/artist.json"),
    years: [ "2020" ],
};

describe("AnimeThemes", () => {
    let responseFromID: Anime,
        responseFromQuery: Anime[],
        responseFromMirror: string[],
        responseFromCount: number,
        responseFromSeason: Season,
        responseFromSeasons: SeasonInfo[],
        responseFromSeasonInfo: Season,
        responseFromArtists: Artist[],
        responseFromArtistSongs: Anime[],
        responseFromYears: number[],
        responseFromYearInfo: Anime[];

    before(async () => {
        nock("https://themes.moe/api")
            .get("/anime/search/Azur%20Lane")
            .reply(200, dummy.search)
            .post("/themes/search")
            .reply(200, [dummy.anime])
            .get("/themes/38328")
            .reply(200, [dummy.anime])
            .get("/themes/38328/OP/mirrors")
            .reply(200, dummy.theme)
            .get("/songcount")
            .reply(200, dummy.count)
            .get("/seasons")
            .reply(200, dummy.seasons)
            .get("/seasons/2020/Winter")
            .times(2)
            .reply(200, [dummy.anime])
            .get("/artists")
            .reply(200, dummy.artists)
            .get("/artists/mayn")
            .reply(200, dummy.artist)
            .get("/years")
            .reply(200, dummy.years)
            .get("/seasons/2020")
            .reply(200, [dummy.anime]);

        responseFromID = await api.getAnime(38328);
        responseFromQuery = await api.search("Azur Lane");
        responseFromMirror = await responseFromID.themes[0].getMirrors();
        responseFromCount = await api.getSongCount();
        responseFromSeason = await api.getSeason(2020, "Winter");
        responseFromSeasons = await api.getSeasons();
        responseFromSeasonInfo = await responseFromSeasons[0].getSeason();
        responseFromArtists = await api.getArtists();
        responseFromArtistSongs = await responseFromArtists[0].getAnime();
        responseFromYears = await api.getYears();
        responseFromYearInfo = await api.getYear(2020);
    });

    describe("#search", () => {
        it("should return a list of anime from a term", () => {
            expect(responseFromQuery).to.be.array();
            expect(responseFromQuery).to
                .satisfy((item: Anime[]) => item.every((val) => val instanceof Anime));
        });
    });

    describe("#getAnime", () => {
        it("should return a single anime from an id", () => {
            expect(responseFromID).to.be.instanceOf(Anime);
        });

        it("should have an array of themes", async () => {
            expect(responseFromID.themes).to
                .satisfy((item: Theme[]) => item.every((val) => val instanceof Theme));
        });

        it("should have a theme", () => {
            const theme = responseFromID.themes[0];
            expect(theme).to.be.instanceOf(Theme);
            expect(theme.type).to.be.a("string");
            expect(theme.number).to.be.a("number");
            expect(theme.version).to.be.a("number");
        });
    });

    describe("#getSongCount", () => {
        it("should be a number", () => {
            expect(responseFromCount).to.be.a("number");
        });
    });

    describe("#getSeason", () => {
        it("should return a season", () => {
            expect(responseFromSeason).to.be.instanceof(Season);
        });
    });

    describe("#getSeasons", () => {
        it("should be a list of season information", () => {
            expect(responseFromSeasons).to.be.array();
            expect(responseFromSeasons).to
                .satisfy((item: SeasonInfo[]) => item.every((val) => val instanceof SeasonInfo));
        });
    });

    describe("#getArtists", () => {
        it("should return a list of artist information", () => {
            expect(responseFromArtists).to.be.array();
            expect(responseFromArtists).to
                .satisfy((item: Artist[]) => item.every((val) => val instanceof Artist));
        });
    });

    describe("#getYears", () => {
        it("should return a list of years", () => {
            expect(responseFromYears).to.be.array();
            expect(responseFromYears).to
                .satisfy((item: Artist[]) => item.every((val) => typeof val === "number"));
        });
    });

    describe("#getYear", () => {
        it("should return a list of anime from a year", () => {
            expect(responseFromQuery).to.be.array();
            expect(responseFromQuery).to
                .satisfy((item: Anime[]) => item.every((val) => val instanceof Anime));
        });
    });

    describe(".Theme", () => {
        describe("#getMirrors", () => {
            it("should return a list of URLs", async () => {
                expect(responseFromMirror).to
                    .satisfy((item: string[]) => item.every((val) => typeof val === "string"));
            });
        });
    });

    describe(".SeasonInfo", () => {
        describe("#getSeason", () => {
            it("should return a season", () => {
                expect(responseFromSeasonInfo).to.be.instanceof(Season);
            });
        });
    });

    describe(".Artist", () => {
        describe("#getSongs", () => {
            it("should return a list of anime", () => {
                expect(responseFromArtistSongs).to.be.array();
                expect(responseFromArtistSongs).to
                    .satisfy((item: Anime[]) => item.every((val) => val instanceof Anime));
            });
        });
    });
});
