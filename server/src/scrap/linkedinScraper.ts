import * as cheerio from "cheerio";
import * as fs from 'fs';
import Nightmare from "nightmare";

export const linkedinScrape = async (title: string, location: string): Promise<void> => {
  const nightmare = Nightmare({ show: false });

  const getData = (html: string): any[] => {
    const data: any[] = [];
    const $ = cheerio.load(html);
   // console.log(html)
    //console.log("div",$("div.base-card"))
    $("div.base-card").each((row, raw_element) => {
      const title = $(raw_element).find("h3.base-search-card__title").text().replace(/\n/g, '').trim();
      console.log("title",title)
      const link = $(raw_element).find("a.hidden-nested-link").attr('href');
      console.log("link",link)
      const company = $(raw_element).find("a.hidden-nested-link").text().replace(/\n/g, '').trim();
      const location = $(raw_element).find("span.job-search-card__location").text().replace(/\n/g, '').trim();
      const description = $(raw_element).find("p.job-result-card__snippet").text().replace(/\n/g, '').trim();
      const date = $(raw_element).find("time.job-search-card__listdate").text().replace(/\n/g, '').trim();
      const logo = $(raw_element).find("img.artdeco-entity-image").attr('src');

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
    console.log("getting response from linkedin...")
    var Xvfb = require('xvfb');
var xvfb = new Xvfb();
xvfb.startSync();

// code that uses the virtual frame buffer here

    const response = await nightmare
      .goto(`https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&trk=homepage-basic_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0`)
      .wait('body')
      .evaluate(() => document.querySelector("body")?.innerHTML)
      .end();


xvfb.stopSync();
// the Xvfb is stopped
console.log("checking response from linkedin...")
    if (response) {
      //console.log('response', response);
      console.log("converting response from linkedin...")
      const result = await getData(response);
      console.log('result');
      const dataStep = JSON.stringify(result, null, 2);
      console.log("wriring to file...");
      fs.writeFileSync('linkedin_scraped_data.json', dataStep);
    }
  } catch (err) {
     console.log("got error from linkedin...");
    console.log(err);
  } finally {
    nightmare.end();
  }
};
