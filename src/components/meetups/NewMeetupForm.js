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
    this.insertFromExcelHandler = this.insertFromExcelHandler.bind(this);
    this.setItems = this.setItems.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    const meetup = this.createMeetup(this.state.enteredTitle,this.state.enteredImage,this.state.enteredAddress,this.state.enteredDescription);
    const meetupData = [];
    meetupData.push(meetup);
    this.props.onAddMeetup(meetupData);
    
  }

  createMeetup(title, image, address,description){
    const meetup = {
      title: title,
      image: image,
      address: address,
      description: description,
    };
    return meetup;
  }

  insertFromExcelHandler(items){
    let meetupData = [];
    items.forEach(item => {
      meetupData.push(item);
    });
    this.props.onAddMeetup(meetupData);
  }

  setItems(items){
    this.setState({items: items});
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
      let a=this.createMeetups(d);
      this.setItems(a);
    });
  }

  createMeetups(items){
    let meetupData = [];
    items.forEach((d) => {
      let meetup = this.createMeetup(d.Title, d.Image, d.Description, d.Address);
      meetupData.push(meetup);
    });
    return meetupData;
  }

  render() {
    return (
      this.state.items.length > 0 ? <ExcelInputMeetups items={this.state.items} onSubmit={this.insertFromExcelHandler} onSetItems={this.setItems} />:<Card>
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
