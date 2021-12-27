import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetup() {
  function addMeetupHandler(data) {
    console.log(data);
  }
  return (
    <div>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}

export default NewMeetup;
