// import { Client, Databases, ID } from 'node-appwrite';
import { scrape } from "./scraping";

export default async ({ res, log, error }) => {

  await scrape();

  /*
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    log('test');
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
