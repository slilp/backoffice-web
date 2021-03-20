import { Button } from "react-bootstrap";

export const columns = [
  {
    title: "รหัสการสั่งซื้อ",
    dataIndex: "code",
    key: "code",
    width:10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    width:10,
    render: (text) => <span>{text}</span>
  },
  {
    title: "ยอดขาย",
    dataIndex: "revenue",
    key: "revenue",
    width:10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "เเก้ไข",
    dataIndex: "edit",
    key: "edit",
    width:10,
    render: (value) => ( 
      <Button variant="primary" onClick={()=> value.func(value.pid , value.customerInfo)}  size="sm" className="font-kanit">
        เลือก
      </Button>
    ),
  },
];
