import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = process.env.DB_URI;
const client = new MongoClient (uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});

let db = client.db(process.env.DB_NAME);

try {
    await client.connect();
    await db.command({ping: 1});
    console.log ("Successfully Pinged DB");
} catch(err) {
    console.error(err);
}

export default db;
