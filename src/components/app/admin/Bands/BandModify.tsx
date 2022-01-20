import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../../../context/context";
import client from "../../../../feathers";

import Button from "../../../buttons/Button";
import Input from "../../../inputs/basic/Input";
import CustomSelect from "../../../inputs/basic/Select";
import Textarea from "../../../inputs/basic/Textarea";
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from "../../styles";


const clientFormData = [
 {
  title: 'Name of Band',
  name: 'name',
  description: 'Enter name of band',
  required: true,
},
{
  title: 'Description of Band',
  name: 'description',
  description: 'Enter description of band',
  required: false,
},
];

const bandTypes =["Provider","Company", "Patient","Plan" ]

interface Props {
 cancelEditClicked?: () => void;
 row?: any;
 backClick: () => void;
}

const bandTypeOptions: string[] = ["Band 1", "Band 2", "Band 3", "Band 4"];

const BandModify: React.FC<Props> = ({ cancelEditClicked, row: band, backClick }) => {
 let BandServ = null;
 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
 } = useForm({
  defaultValues: band
 });
 const { user } = useContext(UserContext); //,setUser
 const [values, setValue] = useState({
  id: band.id,
  name: band.name,
  bandType: band.bandType,
  description: band.description,
 });

 const onSubmit = (data,e) =>{
  e.preventDefault();
  
  //setSuccess(false)
  console.log(data)
  data.facility=band.facility
    //console.log(data);
    
  BandServ.patch(band._id, data)
  .then((res)=>{
          console.log({res});
         // e.target.reset();
         // setMessage("updated Band successfully")
           // toast({
           //    message: 'Band updated succesfully',
           //    type: 'is-success',
           //    dismissible: true,
           //    pauseOnHover: true,
           //  })
            
           backClick()

      })
      .catch((err)=>{
          //setMessage("Error creating Band, probable network issues "+ err )
         // setError(true)
          // toast({
          //     message: "Error updating Band, probable network issues or "+ err,
          //     type: 'is-danger',
          //     dismissible: true,
          //     pauseOnHover: true,
          //   })
      })

} 



 useEffect(() => {
  BandServ = client.service("bands");
  return () => {
   BandServ = null;
  };
 }, [user]);

 return (
  <PageWrapper>
   <GrayWrapper>
    <HeadWrapper>
     <div>
      <h2>Band Details</h2>
      <span>Below are your band’s details</span>
     </div>
     <div>
      <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
      <Button
       label={"Cancel Editing"}
       background={"#f2f2f2"}
       color={"#333"}
       showicon={true}
       icon="bi bi-pen-fill"
       onClick={cancelEditClicked}
      />
     </div>
    </HeadWrapper>
    <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title='Create Band'>
            <GridWrapper>
            <Controller
               key="bandType"
               name="bandType"
               control={control}
               render={({ field }) => (
                <CustomSelect {...field} label="Choose a Band Type" options={bandTypes} />) }
            />
              {clientFormData.map((client, index) => (
                <Controller
                  key={index}
                  name={client.name}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} />) }
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
            <Button label='Save Form' type='submit' />
          </BottomWrapper>
        </form>

   </GrayWrapper>
  </PageWrapper>
 );
};

export default BandModify;
