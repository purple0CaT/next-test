import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    meetupsCollection.find();
    client.close();
    res.status(200).send(meetupsCollection);
  }
}

export default handler;
