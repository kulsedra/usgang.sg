import 'dotenv/config'
import { useScraping } from "./scraping.js";
import { useDatabaseAccess } from "./databaseaccess.js";

export default async ({ res, log, error }) => {
  log('start service');

  const {
    scrapePalace,
    scrapeGrabenhalleForCurrentMonth,
    scrapeGrabenhalleForNextMonth,
    scrapeKugl,
    scrapeGarage,
    scrapeKult } = useScraping();

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

  const scrapeKuglResult = await scrapeKugl();

  if (scrapeKuglResult) {
    await createDocuments(scrapeKuglResult);
  } else {
    error('scraping kugl failed');
  }

  const scrapeGarageResult = await scrapeGarage();

  if (scrapeGarageResult) {
    await createDocuments(scrapeGarageResult);
  } else {
    error('scraping garage failed');
  }

  const scrapeKultResult = await scrapeKult();

  if (scrapeKultResult) {
    await createDocuments(scrapeKultResult);
  } else {
    error('scraping kult failed');
  }

  return res.empty();
}