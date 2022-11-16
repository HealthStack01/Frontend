import {Box, Button} from "@mui/material";
import {useRef} from "react";
import * as XLSX from "xlsx";

interface componentProps {
  updateState?: Function;
  actionButton?: React.FC<{triggerInput: () => void}>;
}

const UploadExcelSheet = ({updateState, actionButton}: componentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelection = () => {
    inputRef.current!.value = "";
    inputRef.current?.click();
  };

  const handleFile = (file /*:File*/) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type: rABS ? "binary" : "array"});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      //console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});

      const [keys, ...values] = data;
      const objects = values.map((array: any) =>
        array?.reduce((a, v, i) => ({...a, [keys[i].replace(" ", "")]: v}), {})
      );

      const newObjects = objects.map(obj => {
        return {
          baseunit: obj?.BaseUnit,
          type: obj.Product,
          quantity: obj.Qty,
          costprice: obj.Costprice,
        };
      });

      //console.log(objects);

      // setProductItem(prevProd => prevProd.concat(productItemI));

      updateState(prev => prev.concat(newObjects));

      //console.log(data);

      /* Update state */
      //this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleChange = (e: {target: {files: any}}) => {
    const files = e.target.files;

    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <Box sx={{width: "100%"}}>
      <input
        type="file"
        name="upload_excel_sheet"
        id="file"
        accept={SheetJSFT}
        onChange={handleChange}
        ref={inputRef}
        style={{display: "none"}}
      />
      <Button
        sx={{width: "100%", textTransform: "capitalize"}}
        onClick={handleFilesSelection}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadExcelSheet;

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key: i};
  return o;
};
