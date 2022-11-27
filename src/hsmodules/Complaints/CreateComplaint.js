import {forwardRef, useState, Component} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {BiChevronDown} from 'react-icons/bi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DatePickerCustomInput = forwardRef(({value, onClick}, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      width: "100%",
      height: "48px",
      border: "1.5px solid #BBBBBB",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      margin: "0.75rem 0",
      fontSize: "0.85rem",
      padding: "0 15px",
      color: "#000000",
      backgroundColor: "#fff",
    }}
  >
    {value === "" ? "Pick Date" : value}
  </div>
));

const CreateComplaint = ({closeModal}) => {
  const [text, setText] = useState('')

  const {register} = useForm();
  return (
    <Box
      container
      sx={{
        width: "500px",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <Box sx={{width:"100%",display:"flex", flexDirection:"column", gap:"1.5rem"}}>
     
            <Input
              register={register("employers_name", {required: true})}
              placeholder="Type here"
              label="To"
              
            />
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
              label="Copy"
            />
        
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
              label="Subject"
          
            />
          
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
              label="Category"
            />

            <CKEditor 
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
            />           

        <Button
          variant="contained"
          sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateComplaint;
