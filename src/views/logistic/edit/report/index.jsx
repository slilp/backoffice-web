import React, { useState , useEffect} from "react";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



function Report({ purchaseId , invoiceId , name , billTo , shipTo , deliverTo , type }) {

    const [exportData,setExportData] = useState([{columns:[{}],data:[[{}]]}]);

    useEffect(()=>{
        
        const exportResponse = [
            { value: purchaseId, style: {  alignment : {wrapText:true} } },
            { value: invoiceId, style: { alignment : {wrapText:true} } },
            { value: name, style: { alignment : {wrapText:true} } },
            { value: billTo, style: { alignment : {wrapText:true}} },
            { value: shipTo, style: { alignment : {wrapText:true} } },
            { value: type?deliverTo : ' - ', style: {  alignment : {wrapText:true}} },
          ];


        setExportData([
            {
              columns: [
                { title: "รหัสรายการ", width: { wpx: 80 } }, //pixels width
                { title: "รหัสบิล", width: { wpx: 80 } }, //pixels width
                { title: "ชื่อลูกค้า", width: { wpx: 200 } }, //pixels width
                { title: "ที่อยู่ตามบิล", width: { wpx: 250 } }, //pixels width
                { title: "ที่อยู่จัดส่ง", width: { wpx: 250 } }, //pixels width
                { title: "ที่อยู่สำหรับผู้ขนส่ง", width: { wpx: 250 } }, //pixels width

              ],
              data: [
                exportResponse
              ],
            },
          ]);


    },[purchaseId,name,billTo,shipTo,deliverTo,type]);

  return (
    <Button type="button" size="sm" variant="primary">
      <i className="far fa-plus-square mr-1"></i>
      <ExcelFile element={<span>ดาวน์โหลด</span>}>
        <ExcelSheet dataSet={exportData} name="Organization" />
      </ExcelFile>
    </Button>
  );
}

export default Report;
