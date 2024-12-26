import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: 'com.trona.dhundo',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);


export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionID!,
            [Query.orderAsc("$createdAt"), Query.limit(5)]
        );

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({
    filter,
    query,
    limit,
}: {
    filter: string;
    query: string;
    limit?: number;
}) {
    try {
        const buildQuery = [Query.orderDesc("$createdAt")];

        if (filter && filter !== "All")
            buildQuery.push(Query.equal("type", filter));

        if (query)
            buildQuery.push(
                Query.or([
                    Query.search("name", query),
                    Query.search("address", query),
                    Query.search("type", query),
                ])
            );

        if (limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionID!,
            buildQuery
        );

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionID!,
            id
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function login() {
    try {
        const redirectURI = linking.createURL('/');
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);

        if (!response) throw new Error('Login Failed.')

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectURI
        )

        if (browserResult.type != 'success') throw new Error('Login Failed.')
        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('Login Failed.');

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error('Failed to create session.');

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}
