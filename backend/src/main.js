import 'dotenv/config'
import { useScraping } from "./scraping.js";
import { useDatabaseAccess } from "./databaseaccess.js";

const main = async () => {
  const { scrapeGrabenhalle } = useScraping();

  const { createDocument } = useDatabaseAccess();

  const scrapeGrabenhalleResult = await scrapeGrabenhalle();

  await createDocument(scrapeGrabenhalleResult);
};

main();