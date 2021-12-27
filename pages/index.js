import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
function HomePage(props) {
  return (
    <div>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((M) => ({
        title: M.title,
        image: M.image,
        id: M._id.toString(),
        description: M.description,
      })),
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //
//   return { props: { meetups: DUMMY_MEETUPS } };
// }
export default HomePage;
