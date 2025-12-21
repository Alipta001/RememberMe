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

export default function MonthCard({ month,id, onPaid, feesPaidMonth, deletePaidMonth }) {
 /*  const [paid, setPaid] = useState(false); */
 console.log(feesPaidMonth)
const isPaid = feesPaidMonth?.includes(month);
console.log(isPaid)



  return (
    <div className={`card ${isPaid ? "paidCard" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{month}</h5>
        <div className="paidBtn">
          <button
            className={`btn ${isPaid ? "btn-paid" : "btn-primary"}`}
            onClick={()=>{onPaid(month),setPaid(true)}} 
          >
           Paid
          </button>
          <button
  className={`btn ${!isPaid ? "btn-unpaid" : "btn-primary"}`}
  onClick={() =>{deletePaidMonth(month)}} 

>
  UnPaid
</button>
        </div>
      </div>
    </div>
  );
}
