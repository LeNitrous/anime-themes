import Anime from "../src/anime";
import chai from "chai";
import chaiArray from "chai-arrays";
import ThemesMoe from "../src";

chai.use(chaiArray);

const expect = chai.expect;
const api = new ThemesMoe();

describe("ThemesMoeAPIWrapper", () => {
    it("should get an anime by it's MyAnimeList ID", async () => {
        const response = await api.fetch(36633);
        expect(response).to.be.an.instanceof(Anime);
        expect(response.title).to.equal("Date A Live III");
    });

    it("should get a list of anime from a term", async () => {
        const response = await api.search("Azur Lane");
        expect(response).to.be.array();
        expect(response.length).to.be.greaterThan(0);
    });

    it("should get a theme's mirror URL", async () => {
        const response = await api.fetch(36633);
        const mirrors = await response.themes[0].getMirrors();
        expect(mirrors).to.be.array();
    });
});
