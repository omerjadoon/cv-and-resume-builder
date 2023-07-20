"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkedinScrape = void 0;
const cheerio = __importStar(require("cheerio"));
const nightmare_1 = __importDefault(require("nightmare"));
const fs = __importStar(require("fs"));
const linkedinScrape = async (title, location) => {
    let nightmare = (0, nightmare_1.default)({ show: false });
    let getData = (html) => {
        let data = [];
        const $ = cheerio.load(html);
        $("div.base-card").each((row, raw_element) => {
            let title = $(raw_element).find("h3.base-search-card__title").text().replace(/\n/g, '').trim();
            console.log("title", title);
            let link = $(raw_element).find("a.hidden-nested-link").attr('href');
            console.log("link", link);
            let company = $(raw_element).find("a.hidden-nested-link").text().replace(/\n/g, '').trim();
            let location = $(raw_element).find("span.job-search-card__location").text().replace(/\n/g, '').trim();
            let description = $(raw_element).find("p.job-result-card__snippet").text().replace(/\n/g, '').trim();
            let date = $(raw_element).find("time.job-search-card__listdate").text().replace(/\n/g, '').trim();
            let logo = $(raw_element).find("img.artdeco-entity-image").attr('src');
            if (title) {
                data.push({
                    title: title,
                    link: link,
                    company: company,
                    location: location,
                    description: description,
                    date: date,
                    logo: logo,
                    website: 'LinkedIn'
                });
            }
        });
        return data;
    };
    try {
        let response = await nightmare
            .goto(`https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&trk=homepage-basic_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0`)
            .wait('body')
            .evaluate(() => { var _a; return (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.innerHTML; })
            .end();
        if (response) {
            let result = await getData(response);
            console.log('result', result);
            let dataStep = JSON.stringify(result, null, 2);
            fs.writeFileSync('linkedin_scraped_data.json', dataStep);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        nightmare.end();
    }
};
exports.linkedinScrape = linkedinScrape;
//# sourceMappingURL=linkedinScraper.js.map