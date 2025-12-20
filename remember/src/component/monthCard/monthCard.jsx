/* import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/monthlyCard.css'
export default function MonthCard({month}) {
  const [paid, setPaid] = useState(false);
  const paidFunction = () =>{
    setPaid(true)
    console.log(paid)
  }


  return (
   <div className={`card ${paid ? "paid-card" : ""}`}>
        <div className="card-body">
    <h5 className="card-title">{month}</h5>
    <div className="paidBtn">
      <button className={`btn ${paid? "btn-Paid":"btn-primary"}`} onClick={paidFunction}>Paid</button>
    <button className="btn btn-primary">UnPaid</button>
    
    </div>
  </div>
  </div>
  )
}
 */

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/monthlyCard.css';

export default function MonthCard({ month,id, onPaid }) {
  const [paid, setPaid] = useState(false);

  return (
    <div className={`card ${paid ? "paidCard" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{month}</h5>
        <div className="paidBtn">
          <button
            className={`btn ${paid ? "btn-paid" : "btn-primary"}`}
            onClick={()=>{onPaid(month),setPaid(true)}} disabled={paid}
          >
           Paid
          </button>
          <button
  className={`btn ${!paid ? "btn-unpaid" : "btn-primary"}`}
  onClick={() =>{setPaid(false)}}
>
  UnPaid
</button>
        </div>
      </div>
    </div>
  );
}
