import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const newMeetup = await meetupsCollection.insertOne(req.body);
    client.close();
    res.status(201).send(newMeetup);
  }
}

export default handler;
