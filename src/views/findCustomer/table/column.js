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
      title: "เลือก",
      dataIndex: "edit",
      key: "edit",
      width: 20,
      render: (value) => ( 
        <Button variant="primary" onClick={()=> value.func(value.cid)}  size="sm" className="font-kanit">
          เลือก
        </Button>
      ),
    },
];
