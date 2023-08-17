import * as cheerio from "cheerio";
import * as fs from 'fs';
import Nightmare from "nightmare";

export const linkedinScrape = async (title: string, location: string): Promise<void> => {
  const nightmare = Nightmare({ show: false });

  const getData = (html: string): any[] => {
    const data: any[] = [];
    const $ = cheerio.load(html);
    console.log(html)
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
    const response = await nightmare
      .goto(`https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&trk=homepage-basic_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0`)
      .wait('body')
      .evaluate(() => document.querySelector("body")?.innerHTML)
      .end();

    if (response) {
      //console.log('response', response);
      
      const result = await getData(response);
      console.log('result', result);
      const dataStep = JSON.stringify(result, null, 2);
      // fs.writeFileSync('linkedin_scraped_data.json', dataStep);
      return result;
    }
  } catch (err) {
    console.log(err);
  } finally {
    nightmare.end();
  }
};
