import { Client, Databases, ID } from 'node-appwrite';

export const useDatabaseAccess = () => {
    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const createDocuments = async (events) => {
        const documents = events.map(event => databases.createDocument('usgang.sg', 'event', ID.unique(),
            {
                "raw_html": event.raw_html,
                "event_description": event.event_description,
                "event_date": event.event_date,
                "event_link": event.event_link,
                "club": event.club,
            }

        ))

        try {
            await Promise.all(documents);
        } catch (e) {
            console.error("Failed to create document: " + e.message)
        }
    }

    return {
        createDocuments
    }
}