/*import React from 'react';
import { Navigate } from 'react-router-dom'

import NewMeetupForm from '../components/meetups/NewMeetupForm';

class NewMeetupPage extends React.Component {

//navigate = useNavigate();
  //navigate=this.props;

  addMeetupHandler(meetupData) {
    fetch(
      'https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      //navigate('/');
      //<Navigate to="/" replace={true} />
       <Navigate to="/" push={true} />
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
*/

import { useNavigate } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const navigate = useNavigate();

  function addMeetupHandler(meetupData) {
    fetch(
      'https://meetup-react-a4b27-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      navigate('/');
    });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;