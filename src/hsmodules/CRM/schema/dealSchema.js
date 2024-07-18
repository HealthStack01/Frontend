import { format, formatDistanceToNowStrict } from 'date-fns';

const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'active':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'inactive':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      default:
        break;
    }
  };

export const DealSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: " Company Name",
      key: "company_name",
      description: "Enter name of Company",
      selector: (row) => row.company_name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Phone Number",
      key: "phone_no",
      description: "Enter bills",
      selector: (row) => row.phone_no,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter name of Duration",
      selector: (row, i) => row.amount,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Prospect Duration",
      key: "duration",
      description: "Enter name of Duration",
      selector: (row, i) => row.duration,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

// TODO: Add a new  schema for Checkin
