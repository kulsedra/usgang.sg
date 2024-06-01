import { GRABENHALLE, PALACE, clubs } from './clubs.js';
import { JSDOM } from 'jsdom';

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

        const html = scrapeWebsite(grabenHalle.url);

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

        const html = scrapeWebsite(palace.url);

        const dom = new JSDOM(html)

        const program = dom.window.document.getElementById('program').innerHTML;

        console.log(program)

        return {
            "raw_html": html,
            "event_description": "test",
            "event_date": "01.06.2024",
            "event_link": "https://www.digitec.ch",
            "club": palace.documentID
        }
    }

    return {
        scrapeGrabenhalle,
        scrapePalace
    }
}