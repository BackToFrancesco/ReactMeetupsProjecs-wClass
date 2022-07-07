import React from "react";

import MeetupList from "../components/meetups/MeetupList";

class AllMeetupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadedMeetups: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ isLoading: true });
    fetch("https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }

        this.setState({ isLoading: false, loadedMeetups: meetups });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    } else {
      return (
        <section>
          <h1>All Meetups</h1>
          <MeetupList meetups={this.state.loadedMeetups} />
        </section>
      );
    }
  }
}

export default AllMeetupsPage;