import React from 'react'

function Info(props) {
    const {icon, data } = props;
  return (
    <div className="field container">
        <div className="icon">{icon}</div>
        <div className="data">{data}</div>
    </div>
  )
}

export default Info