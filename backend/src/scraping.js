import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';

export const scrape = async () => {
    const path = chromedriver.path;

    const driver = await new Builder()
        .withCapabilities(Capabilities.chrome())
        .setChromeService(new chrome.ServiceBuilder(path))
        .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
        .build();

    await driver.get('https://www.grabenhalle.ch');

    const title = await driver.getTitle();

    console.log(title)

    await driver.quit();
}

/*
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
*/