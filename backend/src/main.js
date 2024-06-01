// import { Client, Databases, ID } from 'node-appwrite';
import { Builder, Browser } from 'selenium-webdriver';

export default async ({ res, log, error }) => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get('https://www.grabenhalle.ch');

  const title = await driver.getTitle();

  log(title);

  await driver.quit();

  /*
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    await databases.createDocument(
      'usgang.sg',
      'events',
      ID.unique(),
      {
        "raw_html": "test",
        "club_name": "test",
        "event_description": "test",
        "event_date": "07.05.2024, 15:27:05",
        "event_link": "https://www.digitec.ch"
      }
    )
  } catch (e) {
    error("Failed to create document: " + e.message)
  }
  */

  return res.empty()
};
