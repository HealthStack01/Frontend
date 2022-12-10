export const syptomSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    
    {
      name: "Symptom",
      key: "symptom",
      description: "symptom",
      selector: row => row.symptom,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  
    {
      name: "Duration",
      key: "duration",
      description: "duration",
      selector: row => row.duration,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    // {
    //   name: "Disease",
    //   key: "disease",
    //   description: "disease",
    //   selector: row => row.disease,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
  
  
    {
      name: "Required",
      key: "sympreq",
      description: "sympreq",
      selector: row => row.sympreq ? "False" : "True",
      sortable: true,
      required: true,
      inputType: "checkbox",
    },
    {
        name: "Action",
        key: "action",
        description: "action",
        selector: row => row.action,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
]  

export const clinicalSignSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Finding",
      key: "finding",
      description: "findings",
      selector: row => row.finding,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  
    {
      name: "Required",
      key: "sympreq",
      description: "required",
      selector: row => row.sympreq ? "False" : "True",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  
    {
      name: "Action",
      key: "action",
      description: "action",
      selector: row => row.action,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
   
]  

export const labSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "lab",
      key: "lab",
      description: "test",
      selector: row => row.lab,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
        name: "Value",
        key: "labvalue",
        description: "labvalue",
        selector: row => row.labvalue,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Action",
        key: "action",
        description: "action",
        selector: row => row.action,
        sortable: true,
        required: true,
        inputType: "TEXT",
      }

]