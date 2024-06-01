import { Client, Databases, ID } from 'node-appwrite';

export const useDatabaseAccess = () => {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const createDocument = async ({ raw_html, event_description, event_date, event_link, club }) => {
        try {
            await databases.createDocument('usgang.sg', 'event', ID.unique(),
                {
                    "raw_html": raw_html,
                    "event_description": event_description,
                    "event_date": event_date,
                    "event_link": event_link,
                    "club": club,
                }
            )
        } catch (e) {
            console.error("Failed to create document: " + e.message)
        }
    }

    return {
        createDocument
    }
}