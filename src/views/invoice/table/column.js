import { Button } from "react-bootstrap";
import moment from "moment";

export const columns = [
  {
    title: "รหัสใบเสร็จ",
    dataIndex: "invoiceCode",
    key: "invoiceCode",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รหัสสั่งซื้อ",
    dataIndex: "pid",
    key: "pid",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    width: 200,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รอบการชำระเงิน",
    dataIndex: "pay",
    key: "pay",
    width: 20,
    render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
  },
  {
    title: "จำนวนเงิน",
    dataIndex: "amount",
    dataIndex: "amount",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "สถานะการชำระเงิน",
    dataIndex: "status",
    key: "status",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "เเก้ไข",
    dataIndex: "edit",
    key: "edit",
    width: 20,
    render: (func) => ( 
      <a className="d-inline-block" href={func}>
      <Button variant="primary" size="sm" className="font-kanit">
        เเก้ไข
      </Button>
      </a>
    ),
  },
  {
    title: "ลบข้อมูล",
    dataIndex: "deleteInv",
    key: "deleteInv",
    width: 20,
    render: (func) => ( 
      <Button variant="danger" onClick={func} size="sm" className="font-kanit">
        ลบข้อมูล
      </Button>
    ),
  },
];