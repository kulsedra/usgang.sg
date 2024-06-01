import 'dotenv/config'
import { useScraping } from "./scraping.js";
import { useDatabaseAccess } from "./databaseaccess.js";

export default async ({ res, log, error }) => {
  log('start service');

  const { scrapePalace } = useScraping();

  const { createDocuments } = useDatabaseAccess();

  const scrapePalaceResult = await scrapePalace();

  if (scrapePalaceResult !== null) {
    await createDocuments(scrapePalaceResult);
  } else {
    error('scraping palace failed');
  }

  return res.empty();
}