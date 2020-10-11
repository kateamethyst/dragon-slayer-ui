import React from 'react';

function HpComponent (props) {
  return (
    <>
      <div className="progress">
        <div
        className="progress-bar bg-success"
        role="progressbar"
        aria-valuenow={props.hp}
        aria-valuemin="0"
        aria-valuemax="100"
        style={props.style}
        >
        </div>
      </div>
      <span>{props.hp} / 100</span>
    </>
  )
}

export default HpComponent;