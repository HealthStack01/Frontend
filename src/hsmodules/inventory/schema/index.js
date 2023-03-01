import styled from "styled-components";

function getCssClass(value) {
  //console.log(value);
  if (value) return "expiry";
}

const StyledCell = styled.div`
  &.expiry {
    background: green !important;
    color: white;
    width: 100% !important;
    height: 100% !important;
  }
`;

export const InventoryStoreSchema = [
  {
    name: "S/N",
    key: "_id",
    description: "",
    selector: row => row.sn,
    sortable: true,
    required: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "product",
    key: "product",
    description: "Enter product",
    selector: row => row.name,

    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Quantity",
    key: "quantity",
    description: "Enter quantity",
    selector: row => row.quantity,

    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Base Unit",
    key: "baseunit",
    description: "Enter baseUnit",
    selector: row => row.baseunit,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Stock Value",
    key: "stockValue",
    description: "Enter Stock value",
    selector: row => row.stockvalue,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Cost Price",
    key: "costprice",
    description: "Enter cost price",
    selector: row => row.costprice,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Sell Price",
    key: "sellingprice",
    description: "Enter Selling Price",
    selector: row => row.sellingprice,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Reorder level",
    key: "Re-order",
    description: "Enter Re-order Level",
    selector: row => (row.reorder_level ? row.reorder_level : "Unspecified"),
    sortable: true,
    required: true,
    inputType: "TEXT",
    center: true,
  },
  {
    name: "Expiry",
    key: "Expiry",
    description: "Enter Expiry",
    selector: row =>
      row.expiry ? (
        <div
          style={{
            color: "red",
            fontSize: "1.3rem",
            fontWeight: "700",
          }}
        >
          Exist
        </div>
      ) : (
        ""
      ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    // cell: row => (
    //   <StyledCell className={getCssClass(row.expiry)}>{row.expiry}</StyledCell>
    // ),
  },
];
