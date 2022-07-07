import React from 'react';

import NewMeetupForm from '../components/meetups/NewMeetupForm';


class NewMeetupPage extends React.Component {
  constructor(props){
    super(props);
    this.prova = this.prova.bind(this);
    this.addMeetupHandler = this.addMeetupHandler.bind(this);
  }

  fetchData(meetupData){
    return fetch(
    'https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups.json',
    {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

  addMeetupHandler(meetupData) {
   
    this.fetchData(meetupData).then(() => {
      window.location = '/';
      console.log('Arrivato');
    });
  }


  render(){return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={this.addMeetupHandler} />       
    </section>
  );}
}

export default NewMeetupPage;