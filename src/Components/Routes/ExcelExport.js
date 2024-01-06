import React from "react";
import XLSX from "sheetjs-style";
import {Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import FileSaver from "file-saver"

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <>
      <Tooltip title="Export as Excel">
        <Button
          variant="contained"
          onClick={(e) => exportToExcel(fileName)}
          color="primary"
          style={{ cursor: "pointer", fontSize: 14, display : "block", margin : "auto" }}
        >
          Download Data
        </Button>
      </Tooltip>
    </>
  );
};
export default ExportExcel;
