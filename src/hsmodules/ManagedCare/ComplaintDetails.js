import React from 'react'
import { Avatar} from "@mui/material";
import {BiChevronDown} from 'react-icons/bi';
// import

const ComplaintDetails = () => {

    const dummyComplaints = [
        {
            id:0,
            name:"Teejay Teko",
            category: "Medic care",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            status: "Pending",
            date: "27-10-21"
        },
        {
            id:1,
            name:"Teejay Teko",
            category: "Medic care",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            status: "Resolved",
            date: "27-10-21"
        },
        {
            id:2,
            name:"Teejay Teko",
            category: "Medic care",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            status: "Pending",
            date: "27-10-21"
        },
        {
            id:3,
            name:"Teejay Teko",
            category: "Medic care",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            status: "Resolved",
            date: "27-10-21"
        },
      ]

  return (
    <div >
     <div>

     </div>
     <div>
     <div
              style={{
                width: '80%',
                // height: 'calc(100vh - 90px)',
                height: '450px',
                overflow: 'auto',
                margin: '0 auto',
                marginTop: '3rem',
              }}
            >              {
                dummyComplaints.map((data) => ( 
                    <div key={data.id} className="complaint_wrapper2" >
                        <div className="complaint_head">
                            <div className="complaint_head_left">
                                <Avatar src="/img_avatar.png" alt="" />
                                <h1>{data.name}</h1>
                            </div>
                            <p>Category: <strong>{data.category}</strong></p>
                        </div>
                        <div className="complaint_foot">
                            <p style={{color: "#979DAC", width: "60%"}}>{data.description}</p>
                            <p style={{color: data.status == 'Pending' ? "#17935C" : "#F1A153", fontWeight: 700, margin: '0.5rem'}}>{data.status}</p>
                        </div>
                        <p style={{color:"#979DAC", margin: '0 0 0 50px'}}>{data.date}</p>
                        
                    </div>
                ))
              }

            </div>
     </div>
    </div>
  )
}

export default ComplaintDetails
