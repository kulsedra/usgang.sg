import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export const scrape = async () => {
    const options = new chrome.Options();
    options.addArguments('--headless=new');

    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();

    await driver.get('https://www.grabenhalle.ch');

    const title = await driver.getTitle();

    console.log(title)

    await driver.quit();
}