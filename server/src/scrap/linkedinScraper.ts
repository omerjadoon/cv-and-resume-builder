import * as cheerio from "cheerio";
import Nightmare from "nightmare";
import * as fs from 'fs';

export const linkedinScrape = async (title: string, location: string): Promise<void> => {
  let nightmare = Nightmare({ show: false });

  let getData = (html: string): any[] => {
    let data: any[] = [];
    const $ = cheerio.load(html);
    //console.log("div",$("div.base-card"))
    $("div.base-card").each((row, raw_element) => {
      let title = $(raw_element).find("h3.base-search-card__title").text().replace(/\n/g, '').trim();
      console.log("title",title)
      let link = $(raw_element).find("a.hidden-nested-link").attr('href');
      console.log("link",link)
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
      .evaluate(() => document.querySelector("body")?.innerHTML)
      .end();

    if (response) {
      //console.log('response', response);
      
      let result = await getData(response);
      console.log('result', result);
      let dataStep = JSON.stringify(result, null, 2);
      fs.writeFileSync('linkedin_scraped_data.json', dataStep);
    }
  } catch (err) {
    console.log(err);
  } finally {
    nightmare.end();
  }
};
