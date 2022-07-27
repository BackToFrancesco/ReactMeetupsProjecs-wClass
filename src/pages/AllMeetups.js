import Button from "react-bootstrap/Button";
import React from "react";
import { connect } from "react-redux";
import MeetupList from "../components/meetups/MeetupList";
import { logIn, logOut } from "../actions";

class AllMeetupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadedMeetups: [],
    };
    this.deleteData = this.deleteData.bind(this);
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

  deleteData(id) {
    fetch(
      "https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups/" +
        id +
        ".json",
      {
        method: "DELETE",
      }
    ).then(() => {
      this.componentDidMount();
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
          <MeetupList
            meetups={this.state.loadedMeetups}
            onDeleteMeetup={this.deleteData}
          />
          <Button
            onClick={() => {
              this.props.logIn();
            }}
          >
            {this.props.isLogged ? "LogOut" : "LogIn"}
          </Button>
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { isLogged: state.isLogged };
};
/** Altro modo per fornire logIn/logged 
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch({type: 'SING_IN'})};
}
*/
export default connect(mapStateToProps, { logIn, logOut })(AllMeetupsPage);
