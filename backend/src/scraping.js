import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export const scrape = async () => {
    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
        .build();

    await driver.get('https://www.grabenhalle.ch');

    const title = await driver.getTitle();

    console.log(title)

    await driver.quit();
}