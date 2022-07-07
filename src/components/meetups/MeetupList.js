import React from "react";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

class MeetupList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMeetupHandler = this.deleteMeetupHandler.bind(this);
    };
    

  deleteMeetupHandler(id){
    this.props.onDeleteMeetup(id);
  }

  render() {
    return (
      <ul className={classes.list}>
        {this.props.meetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            description={meetup.description}
            onDeleteMeetup={this.deleteMeetupHandler}
          />
        ))}
      </ul>
    );
  }
}

export default MeetupList;


