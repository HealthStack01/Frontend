import React, {useState} from 'react'
import { Avatar} from "@mui/material";
import {BiChevronDown} from 'react-icons/bi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BsArrowLeftShort} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {Collapse} from "@mui/material";

const ComplaintDetails = () => {
    const [text, setText] = useState('')
    const [isOpenCollapse, setIsOpenCollapse] = useState(null);

const handleOpen = (clickedIndex) => {
  if (isOpenCollapse === clickedIndex) {
    setIsOpenCollapse(null);
  } else {
    setIsOpenCollapse(clickedIndex);
  }
};



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
      const navigate = useNavigate();
  return (
    <div >
     <h3 onClick={() => navigate(-1)} style={{marginLeft: '4rem'}}><BsArrowLeftShort style={{height:'1.5rem', width:'1.5rem',fontSize:"1rem"}}/></h3>
     <div>
 <div
              style={{
                width: '80%',
                // height: 'calc(100vh - 90px)',
                height: '600px',
                overflow: 'auto',
                margin: '0 auto',
                marginTop: '3rem',
              }}
            >              {
                dummyComplaints.map((data,index) => ( 
                    <div key={data.id} className="complaint_wrapper2" onClick={() => handleOpen(index)}>
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
                            {/* <img src={<BiChevronDown/>} alt='' style={{color: 'blue', height: '1rem', width: '1rem', margin: '0', marginTop: '-2rem'}} /> */}
                        </div>
                        <p style={{color:"#979DAC", margin: '0 0 0 50px'}}>{data.date}</p>
            
                  <Collapse in={isOpenCollapse === index}>
                  <CKEditor 
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                const data = editor.getData()
                setText(data)
            }}
            />
                  </Collapse>
                    </div>
                ))
              }
            </div>
     </div>
    </div>
  )
}

export default ComplaintDetails
