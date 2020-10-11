import React from 'react';

function ActivityComponent (props) {
  return (
    <div className="activity p-3 text-left">
      {props.activity ? props.activity.map((activity, index) => {
        return (
          <p key={index}>{activity}</p>
        ); 
      }) : ''}
    </div>
  )
}

export default ActivityComponent;