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

        const currentYear = moment().format('YYYY');

        const currentMonth = moment().format('MM');

        const html = await scrapeWebsite(`${grabenHalle.url}/${currentYear}/${currentMonth}`);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html)

        const listing = dom.window.document.getElementById('listing');

        const events = Array.from(listing.getElementsByClassName('post'));

        return events.map(event => {
            const posttitle = event.getElementsByClassName('posttitle')[0];

            const headline = posttitle.textContent;

            const link = posttitle.getElementsByTagName('a')[0].getAttribute("href");

            const eventDay = event.getElementsByClassName('dayInfo')[0].textContent;

            const eventDayIndex = eventDay.indexOf('.');

            const date = `${eventDay.substring(eventDayIndex - 2, eventDayIndex)}.${currentMonth}.${currentYear}`

            return {
                "raw_html": html,
                "event_description": headline,
                "event_date": date,
                "event_link": link,
                "club": grabenHalle.documentID
            }
        })
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
            const headline = event.getElementsByClassName('headline')[0].textContent || event.getElementsByClassName('act')[0].textContent;

            const link = palace.url + event.getAttribute("href");

            const onClickAttribute = event.getAttribute('onclick');

            const dateStartIndex = onClickAttribute.indexOf('"Event/') + 7;

            const dateEndIndex = dateStartIndex + 10;

            const date = moment(onClickAttribute.substring(dateStartIndex, dateEndIndex)).format('DD.MM.YYYY');

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

const { scrapeGrabenhalle, scrapePalace } = useScraping();

console.log(await scrapeGrabenhalle())