import 'dotenv/config'
import { useScraping } from "./scraping.js";
import { useDatabaseAccess } from "./databaseaccess.js";

export default async ({ res, log, error }) => {
  log('start service');

  const { scrapePalace, scrapeGrabenhalleForCurrentMonth, scrapeGrabenhalleForNextMonth } = useScraping();

  const { createDocuments } = useDatabaseAccess();

  const scrapeGrabenhalleForCurrentMonthResult = await scrapeGrabenhalleForCurrentMonth();

  if (scrapeGrabenhalleForCurrentMonthResult) {
    await createDocuments(scrapeGrabenhalleForCurrentMonthResult);
  } else {
    error('scraping grabenhalle for current month failed');
  }

  const scrapeGrabenhalleForNextMonthResult = await scrapeGrabenhalleForNextMonth();

  if (scrapeGrabenhalleForNextMonthResult) {
    await createDocuments(scrapeGrabenhalleForNextMonthResult);
  } else {
    error('scraping grabenhalle for next month failed');
  }

  const scrapePalaceResult = await scrapePalace();

  if (scrapePalaceResult) {
    await createDocuments(scrapePalaceResult);
  } else {
    error('scraping palace failed');
  }

  return res.empty();
}