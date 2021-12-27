import { Fragment } from "react";
import style from "./MeetupDetails.module.css";
//
function MeetupDetail({ meetup }) {
  return (
    <>
      {meetup && (
        <section className={style.detailsWrapper}>
          <img src={meetup.image} />
          <h1>{meetup.title}</h1>
          <p>{meetup.address}</p>
          <p>{meetup.description}</p>
        </section>
      )}
    </>
  );
}

export default MeetupDetail;
