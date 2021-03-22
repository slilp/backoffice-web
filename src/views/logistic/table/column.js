import { Button } from "react-bootstrap";
import moment from "moment";

export const columns = [
  {
    title: "วันส่งของ",
    dataIndex: "pay",
    key: "pay",
    width: 20,
    render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
  },
  {
    title: "รหัสใบเสร็จ",
    dataIndex: "inv",
    key: "inv",
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
    title: "พนักงานส่งของ",
    dataIndex: "tname",
    key: "tname",
    width: 100,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    width: 100,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ประเภทการขนส่ง",
    dataIndex: "type",
    key: "type",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "สถานะการขนส่ง",
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