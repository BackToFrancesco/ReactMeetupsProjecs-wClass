import React from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

class NewMeetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredTitle: "",
      enteredImage: "",
      enteredAddress: "",
      enteredDescription: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();

    const meetupData = {
      title: this.state.enteredTitle,
      image: this.state.enteredImage,
      address: this.state.enteredAddress,
      description: this.state.enteredDescription,
    };

    this.props.onAddMeetup(meetupData);
  }

  render() {
    return (
      <Card>
        <form className={classes.form} onSubmit={this.submitHandler}>
          <div className={classes.control}>
            <label>Meetup Title</label>
            <input
              type="text"
              required
              id="title"
              value={this.state.enteredTitle}
              onChange={(e)=> this.setState({enteredTitle: e.target.value})}
            />
          </div>
          <div className={classes.control}>
            <label>Meetup Image</label>
            <input
              type="url"
              required
              id="image"
              value={this.state.enteredImage}
              onChange={(e)=> this.setState({enteredImage: e.target.value})}
            />
          </div>
          <div className={classes.control}>
            <label>Description</label>
            <textarea
              id="description"
              required
              rows="5"
              onChange={(e)=> this.setState({enteredDescription: e.target.value})}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label>Address</label>
            <input
              type="text"
              required
              id="address"
              onChange={(e)=> this.setState({enteredAddress: e.target.value})}
            />
          </div>
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </Card>
    );
  }
}

export default NewMeetupForm;
