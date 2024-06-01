import { GRABENHALLE, PALACE, clubs } from './clubs.js';
import { JSDOM } from 'jsdom';
import moment from 'moment';

export const useScraping = () => {
    const scrapeWebsite = async (url) => {
        try {
            const response = await fetch(url);
            return response.text();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const scrapeGrabenhalle = async () => {
        const grabenHalle = clubs[GRABENHALLE];

        console.log(`start scraping ${grabenHalle.name}`)

        const html = await scrapeWebsite(grabenHalle.url);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html)

        return {
            "raw_html": html,
            "event_description": "test",
            "event_date": "01.06.2024",
            "event_link": "https://www.digitec.ch",
            "club": grabenHalle.documentID
        }
    }

    const scrapePalace = async () => {
        const palace = clubs[PALACE];

        console.log(`start scraping ${palace.name}`)

        const html = await scrapeWebsite(palace.url);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html)

        const program = dom.window.document.getElementById('program');

        const events = Array.from(program.getElementsByTagName('a'));

        return events.map(event => {
            const headline = event.getElementsByClassName('headline')[0].textContent;

            const link = palace.url + event.getAttribute("href");

            const onClickAttribute = event.getAttribute('onclick');

            const dateStartIndex = onClickAttribute.indexOf('"Event/') + 7;

            const dateEndIndex = dateStartIndex + 10;

            const date = moment(onClickAttribute.substring(dateStartIndex, dateEndIndex)).format('YYYY.MM.DD');

            return {
                "raw_html": html,
                "event_description": headline,
                "event_date": date,
                "event_link": link,
                "club": palace.documentID
            }
        })
    }

    return {
        scrapeGrabenhalle,
        scrapePalace
    }
}