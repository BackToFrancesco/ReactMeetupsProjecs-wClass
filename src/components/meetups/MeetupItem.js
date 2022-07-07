import React from 'react';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';


class MeetupItem extends React.Component{
  render(){
    return (
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img src={this.props.image} alt={this.props.title} />
          </div>
          <div className={classes.content}>
            <h3>{this.props.title}</h3>
            <address>{this.props.address}</address>
            <p>{this.props.description}</p>
          </div>
          <div className={classes.actions}>
            <button onClick={()=>this.props.onDeleteMeetup(this.props.id)}>
              Elimina
            </button>
          </div>
        </Card>
      </li>
    );
  }
}

export default MeetupItem;