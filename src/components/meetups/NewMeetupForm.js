import React from "react";
import ExcelInputMeetups from "../../pages/ExcelInputMeetups";
import Card from "../ui/Card";

import * as XLSX from "xlsx";

import classes from "./NewMeetupForm.module.css";

class NewMeetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredTitle: "",
      enteredImage: "",
      enteredAddress: "",
      enteredDescription: "",
      items: [],
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

  readExcel(file) {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => reject();
    });

    promise.then((d) => {
      this.setState({ items: d });
      console.log(this.state.items);
    });
  }

  render() {
    return (
      this.state.items.length >0 ? <ExcelInputMeetups items={this.state.items}/>:<Card>
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
          <div className={classes.control}>
           <label>Or insert a formatted file:</label>
            <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              this.readExcel(file);
            }}
          ></input>
          </div>
        </form>
      </Card>
    );
  }
}

export default NewMeetupForm;
