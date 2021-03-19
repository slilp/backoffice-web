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
      title: "ที่อยู่จัดส่ง",
      dataIndex: "location",
      key: "location",
      width:10,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ที่อยู่ขนส่ง",
      dataIndex: "deliveryLocation",
      dataIndex: "deliveryLocation",
      width:10,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "วิธีการจัดส่ง",
      dataIndex: "type",
      key: "type",
      width:10,
      render: (text) => <span>{text}</span>,
    },
  {
    title: "ยอดขาย",
    dataIndex: "revenue",
    key: "revenue",
    width:10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    key: "status",
    width: 10,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "เเก้ไข",
    dataIndex: "edit",
    key: "edit",
    width:10,
    render: (func) => (
      <a className="d-inline-block" href={func}>
      <Button variant="primary" size="sm" className="font-kanit">
        เเก้ไข
      </Button>
      </a>
    ),
  },
];
