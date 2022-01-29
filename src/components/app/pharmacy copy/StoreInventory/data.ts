import { TableColumn } from 'react-data-table-component';
export interface BandDataRow {
  id: number;
  product: string;
  quantity: string;
  baseUnit: string;
  stockValue: string;
  costPrice: string;
  sellingPrice: string;
  reOrderLevel: string;
  expiry: string;
  data: [];
}

export const columnHead: TableColumn<BandDataRow>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Product',
    selector: (row) => row.product,
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: 'Base Unit',
    selector: (row) => row.baseUnit,
    sortable: true,
  },
  {
    name: 'Stock Value',
    selector: (row) => row.stockValue,
    sortable: true,
  },
  {
    name: 'Cost Price',
    selector: (row) => row.costPrice,
    sortable: true,
  },
  {
    name: 'Selling Price',
    selector: (row) => row.sellingPrice,
    sortable: true,
  },
  {
    name: 'Re-Order Level',
    selector: (row) => row.reOrderLevel,
    sortable: true,
  },
  {
    name: 'Expiry',
    selector: (row) => row.expiry,
    sortable: true,
  },
];

export const rowData = [
  {
    id: 1,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: 2,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: 3,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: 4,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: 5,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: 6,
    product: 'Product 1',
    quantity: '180',
    baseUnit: 'Tablet',
    stockValue: '54000',
    costPrice: '400',
    sellingPrice: '900',
    reOrderLevel: '4',
    expiry: 'exist',
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
];
