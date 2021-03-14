import { Button } from "react-bootstrap";

export const columns = [
    {
      title: "รหัสลูกค้า",
      dataIndex: "code",
      key: "code",
      width: 20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      width: 20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ประเภท",
      dataIndex: "type",
      key: "type",
      width: 10,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ที่อยู่",
      dataIndex: "location",
      key: "location",
      width: 50,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
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
