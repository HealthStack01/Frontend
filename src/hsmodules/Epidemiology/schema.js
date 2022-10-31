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
  
    {
      name: "Required",
      key: "required",
      description: "required",
      selector: row => row.required,
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
      key: "required",
      description: "required",
      selector: row => row.required,
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
      name: "Test",
      key: "test",
      description: "test",
      selector: row => row.test,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
        name: "Value",
        key: "value",
        description: "value",
        selector: row => row.value,
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