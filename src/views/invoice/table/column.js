import { Button } from "react-bootstrap";

export const columns = [
  {
    title: "รหัสใบเสร็จ",
    dataIndex: "invoiceCode",
    key: "invoiceCode",
    width: 25,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รหัสสั่งซื้อ",
    dataIndex: "pid",
    key: "pid",
    width: 25,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    width: 25,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "รอบการชำระเงิน",
    dataIndex: "pay",
    key: "pay",
    width: 25,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "จำนวนเงิน",
    dataIndex: "amount",
    dataIndex: "amount",
    width: 25,
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
    render: (text) => (
      <Button variant="primary" size="sm" className="font-kanit">
        เเก้ไข
      </Button>
    ),
  },
];