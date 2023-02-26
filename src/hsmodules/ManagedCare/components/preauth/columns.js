export const getComplaintColumns = deleteAction => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Complaint",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.complaint,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Duration",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.duration,
      sortable: true,
      inputType: "HIDDEN",
      width: "100px",
    },
  ];

  return columns;
};

export const getDiagnosisColumns = deleteAction => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Type",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.type,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.diagnosis,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  return columns;
};

export const getServicesColumns = deleteAction => {
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Service Name",
      key: "item",
      description: "Item",
      selector: row => row.service.serviceName,
      sortable: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "QTY",
      key: "submittedQuantity",
      description: "Submitted QTY",
      selector: row => row.quantity,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Unit Price",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row.unitprice,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "payableBill",
      description: "Payable Bill",
      selector: row => row.amount,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Comments",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row.comments,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row?.status,
      sortable: true,
      inputType: "TEXT",
    },
  ];

  return columns;
};
