import React from "react";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

class NewMeetupPage extends React.Component {
  constructor(props) {
    super(props);
    this.addMeetupHandler = this.addMeetupHandler.bind(this);
  }

  fetchData(meetup) {
    return fetch(
      "https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetup),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  addMeetupHandler(meetupData) {
    let cnt = meetupData.length;
    meetupData.forEach((meetup) => {
      this.fetchData(meetup).then(()=>{
        cnt--;
        if (cnt === 0) {
          window.location = "/";
        }
      });
    });
  }

  render() {
    return (
      <section>
        <h1>Add New Meetup</h1>
        <NewMeetupForm onAddMeetup={this.addMeetupHandler} />
      </section>
    );
  }
}

export default NewMeetupPage;
