import Anime from "../src/anime";
import chai from "chai";
import chaiArray from "chai-arrays";
import AnimeThemes from "../src";

chai.use(chaiArray);

const expect = chai.expect;
const api = new AnimeThemes();

describe("AnimeThemes", () => {
    describe("#search", () => {
        it("should return a list of numeric ids from a term", async () => {
            const response = await api.search("Azur Lane");
            expect(response).to.be.array();
        });
    });

    describe("#getAnime", () => {
        it("should return a single anime from an id", async () => {
            const response = await api.getAnime(38328);
            expect(response).to.be.an.instanceof(Anime);
        });
    });

    describe(".Theme", () => {
        describe("#getMirrors", () => {
            it("should return a list of URLs", async () => {
                const response = await api.getAnime(38328);
                const mirrors = await response.themes[0].getMirrors();
                expect(mirrors).to.be.array();
            });
        });
    });
});
