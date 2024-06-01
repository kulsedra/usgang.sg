import 'dotenv/config'
import { useScraping } from "./scraping.js";
import { useDatabaseAccess } from "./databaseaccess.js";

export default async ({ res, log, error }) => {
  log('start service');

  const { scrapeGrabenhalle, scrapePalace } = useScraping();

  const { createDocument } = useDatabaseAccess();

  const scrapeGrabenhalleResult = await scrapeGrabenhalle();

  await createDocument(scrapeGrabenhalleResult);

  const scrapePalaceResult = await scrapePalace();

  await createDocument(scrapePalaceResult);

  return res.empty();
}