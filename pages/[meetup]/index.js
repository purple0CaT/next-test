import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
//
function meetupDetails(props) {
  return (
    <>
      <MeetupDetail meetup={props.meetup} />
    </>
  );
}
//
export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((D) => ({
      params: {
        meetup: D._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetup;
  const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const singleMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetup: {
        title: singleMeetup.title,
        id: singleMeetup._id.toString(),
        image: singleMeetup.image,
        description: singleMeetup.description,
      },
    },
    revalidate: 60,
  };
}
export default meetupDetails;
