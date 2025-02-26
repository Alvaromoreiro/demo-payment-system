import { MongoClient, ServerApiVersion, Collection, ObjectId } from 'mongodb';

const uri = `mongodb://localhost:27017/`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

interface User {
    _id?: ObjectId;
    email: string;
    password: string;
}

export async function connectToCollectionUser(): Promise<Collection<User> | null> {
    try {
        await client.connect();
        const database = client.db('app');
        return database.collection<User>('users');
    } catch (error) {
        console.error('Error connecting to the database');
        console.error(error);
        await client.close();
        return null;
    }
}
