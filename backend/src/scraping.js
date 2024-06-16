import { GRABENHALLE, PALACE, KUGL, KULT, GARAGE, clubs } from './clubs.js';
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

    const scrapeGrabenhalleForCurrentMonth = async () => {
        const currentYear = moment().format('YYYY');

        const currentMonth = moment().format('MM');

        return await scrapeGrabenhalle(currentMonth, currentYear);
    }

    const scrapeGrabenhalleForNextMonth = async () => {
        const nextMonth = moment().add(1, 'month').format('MM');

        if (nextMonth === '01') {
            const nextYear = moment().add(1, 'year').format('YYYY');

            return await scrapeGrabenhalle(nextMonth, nextYear);
        } else {
            const currentYear = moment().format('YYYY');

            return await scrapeGrabenhalle(nextMonth, currentYear);
        }
    }

    const scrapeGrabenhalle = async (month, year) => {
        const grabenHalle = clubs[GRABENHALLE];

        console.log(`start scraping ${grabenHalle.name}`)

        const html = await scrapeWebsite(`${grabenHalle.url}/${year}/${month}`);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html)

        const listing = dom.window.document.getElementById('listing');

        if (!listing) {
            return null;
        }

        const events = Array.from(listing.getElementsByClassName('post'));

        if (!events) {
            return null;
        }

        return events.map(event => {
            const posttitle = event.getElementsByClassName('posttitle')[0];

            const headline = posttitle.textContent;

            const link = posttitle.getElementsByTagName('a')[0].getAttribute("href");

            const eventDay = event.getElementsByClassName('dayInfo')[0].textContent;

            const eventDayIndex = eventDay.indexOf('.');

            const date = `${eventDay.substring(eventDayIndex - 2, eventDayIndex)}.${month}.${year}`

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

    const scrapeKugl = async () => {
        const kugl = clubs[KUGL];

        console.log(`start scraping ${kugl.name}`)

        const html = await scrapeWebsite(kugl.url);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html);

        const program = dom.window.document.getElementsByClassName("col-5 col-lg-4");

        const events = Array.from(program[0].getElementsByClassName('event-item'));

        let yearFlag = false;
        const currentYear = moment().format('YYYY');

        return events.map(event => {
            const headline = event.getElementsByClassName('event-headline')[0].textContent;

            const link = event.getElementsByTagName('a')[0].getAttribute("href");

            const datetext = event.getElementsByClassName('event-date')[0].textContent;

            const mm = datetext.substring(3, 5);
            const dd = datetext.substring(0, 2);

            if (mm === '12') yearFlag = true;
            if (mm === '01' && yearFlag) {
                yearFlag = false;
                currentYear += 1;
            }

            const date = moment().year(currentYear).month(mm - 1).date(dd).format('DD.MM.YYYY');

            return {
                "raw_html": html,
                "event_description": headline,
                "event_date": date,
                "event_link": link,
                "club": kugl.documentID
            }
        })

    }


    const scrapeKult = async () => {
        const kult = clubs[KULT];

        console.log(`start scraping ${kult.name}`)

        const html = await scrapeWebsite(kult.url);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html)

        const portfolio = dom.window.document.getElementById('portfolio');

        const events = Array.from(portfolio.getElementsByClassName('about-paragraph'));

        return events.map(event => {
            const headlines = Array.from(event.getElementsByTagName('strong'));

            return headlines.map(headline => {
                console.log(headline.textContent)

                console.log('+')

                console.log(event.textContent)

                return {
                    "raw_html": html,
                    "event_description": '',
                    "event_date": '',
                    "event_link": kult.url,
                    "club": kult.documentID
                }
            });
        })
    }

    const scrapeGarage = async () => {
        const garage = clubs[GARAGE];

        console.log(`start scraping ${garage.name}`)

        const html = await scrapeWebsite(garage.url);

        if (html === null) {
            return null;
        }

        const dom = new JSDOM(html);

        console.log(dom)
        const program = dom.window.document.getElementById("nu-elist");

        console.log("program")
        console.log(program)
        const events = Array.from(program.getElementsByClassName('nu-e-content-pane'));

        console.log(events)

        return events.map(event => {
            const headline = event.getElementsByClassName('nu-e-title sans')[0].textContent;

            const link = "https://garage-sg.ch/nu/events/event_list/";

            const datetext = event.getElementsByTagName('h4')[0].textContent;

            const date = moment(datetext).format('DD.MM.YYYY');

            return {
                "raw_html": html,
                "event_description": headline,
                "event_date": date,
                "event_link": link,
                "club": garage.documentID
            }
        })

    }

    return {
        scrapeGrabenhalleForCurrentMonth,
        scrapeGrabenhalleForNextMonth,
        scrapePalace,
        scrapeKugl,
        scrapeGarage,
        scrapeKult,
    }
}

// const { scrapeKult } = useScraping();

// await scrapeKult()