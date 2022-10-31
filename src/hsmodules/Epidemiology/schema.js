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