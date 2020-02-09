import Anime from "../src/anime";
import AnimeThemes from "../src";
import chai from "chai";
import chaiArray from "chai-arrays";
import nock from "nock";
import Theme from "../src/theme";

chai.use(chaiArray);

const expect = chai.expect;
const api = new AnimeThemes();

const dummy = {
    anime: require("./dummy/anime.json"),
    search: require("./dummy/search.json"),
    theme: require("./dummy/theme.json"),
};

describe("AnimeThemes", () => {
    let responseFromID: Anime;
    let responseFromQuery: Anime[];
    before(async () => {
        nock("https://themes.moe/api")
            .get("/anime/search/Azur%20Lane")
            .reply(200, dummy.search)
            .post("/themes/search")
            .reply(200, [dummy.anime])
            .get("/themes/38328")
            .reply(200, [dummy.anime])
            .get("/themes/38328/OP/mirrors")
            .reply(200, dummy.theme);

        responseFromID = await api.getAnime(38328);
        responseFromQuery = await api.search("Azur Lane");
    });

    describe("#search", () => {
        it("should return a list of anime from a term", () => {
            expect(responseFromQuery).to.be.array();
            expect(responseFromQuery).to
                .satisfy((item: any[]) => item.every((val) => val instanceof Anime));
        });
    });

    describe("#getAnime", () => {
        it("should return a single anime from an id", () => {
            expect(responseFromID).to.be.instanceOf(Anime);
            expect(responseFromID.id).to.be.a("number");
            expect(responseFromID.title).to.be.a("string");
            expect(responseFromID.season).to.be.a("string");
            expect(responseFromID.year).to.be.a("number");
        });

        it("should have an array of themes", async () => {
            expect(responseFromID.themes).to
                .satisfy((item: any[]) => item.every((val) => val instanceof Theme));
        });

        it("should have a theme", () => {
            const theme = responseFromID.themes[0];
            expect(theme.title).to.be.a("string");
            expect(theme.type).to.be.a("string");
            expect(theme.number).to.be.a("number");
            expect(theme.url).to.be.a("string");
            expect(theme.version).to.be.a("number");
        });
    });

    describe(".Theme", () => {
        describe("#getMirrors", () => {
            it("should return a list of URLs", async () => {
                const mirrors = await responseFromID.themes[0].getMirrors();
                expect(mirrors).to
                    .satisfy((item: any[]) => item.every((val) => typeof val === "string"));
            });
        });
    });
});
