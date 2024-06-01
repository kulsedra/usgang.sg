import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';
import { GRABENHALLE, clubs } from './clubs.js';

export const useScraping = () => {
    const createDriver = async () => {
        return await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeService(new chrome.ServiceBuilder(chromedriver.path))
            .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
            .build();
    }

    const scrapeGrabenhalle = async () => {
        const driver = await createDriver();

        await driver.get(clubs[GRABENHALLE].url);

        const title = await driver.getTitle();

        console.log(title)

        await driver.quit();

        return {
            "raw_html": "test",
            "event_description": "test",
            "event_date": "01.06.2024",
            "event_link": "https://www.digitec.ch",
            "club": "palace"
        }
    }

    return {
        scrapeGrabenhalle
    }
}