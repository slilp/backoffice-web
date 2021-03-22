import { Button } from "react-bootstrap";
import moment from "moment";

export const columns = [
  {
    title: "รหัสใบเสร็จ",
    dataIndex: "invoiceCode",
    key: "invoiceCode",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รหัสสั่งซื้อ",
    dataIndex: "pid",
    key: "pid",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รอบการชำระเงิน",
    dataIndex: "pay",
    key: "pay",
    render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
  },
  {
    title: "จำนวนเงิน",
    dataIndex: "amount",
    dataIndex: "amount",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "เเก้ไข",
    dataIndex: "edit",
    key: "edit",
    render: (value) => ( 
      <Button variant="primary" onClick={()=> value.func(value.inv , value.cid , value.pid)}  size="sm" className="font-kanit">
        เลือก
      </Button>
    ),
  }
];