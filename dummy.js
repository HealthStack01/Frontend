// <th>
//   <abbr title="Serial No">S/No</abbr>
// </th>
// <th>
//   <abbr title="Category">Category</abbr>
// </th>
// <th>
//   <abbr title="Name">Name</abbr>
// </th>
// <th>
//   <abbr title="Quantity">Quanitity</abbr>
// </th>
// <th>
//   <abbr title="Unit">Unit</abbr>
// </th>
// <th>
//   <abbr title="Selling Price">Selling Price</abbr>
// </th>
// <th>
//   <abbr title="Amount">Amount</abbr>
// </th>
// <th>
//   <abbr title="Billing Mode">Mode</abbr>
// </th>
// <th>
//   <abbr title="Actions">Actions</abbr>
// </th>

const dummyData = [
  {
    category: "Treatment",
    name: "Dummy data",
    quantity: "1",
    baseunit: "test",
    sellingprice: "1000",
    amount: "1000",
    billMode: {
      type: "Cash",
    },
  },
  {
    category: "Accessment",
    name: "Test Table",
    quantity: "2",
    baseunit: "test-test",
    sellingprice: "1500",
    amount: "3000",
    billMode: {
      type: "Cash",
    },
  },
  {
    category: "Check-up",
    name: "John Doe",
    quantity: "4",
    baseunit: "test-joe",
    sellingprice: "300",
    amount: "1200",
    billMode: {
      type: "Transfer",
    },
  },
];
