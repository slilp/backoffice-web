import { Button } from "react-bootstrap";

export const columns = [
  {
    title: "รหัสการสั่งซื้อ",
    dataIndex: "code",
    key: "code",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ชื่อลูกค้า",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "ยอดขาย",
    dataIndex: "revenue",
    key: "revenue",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "เเก้ไข",
    dataIndex: "edit",
    key: "edit",
    render: (text) => (
      <Button variant="primary" size="sm" className="font-kanit">
        เเก้ไข
      </Button>
    ),
  },
];
