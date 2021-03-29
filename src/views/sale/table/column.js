import { Button } from "react-bootstrap";

export const columns = [
    {
      title: "คำนำหน้า",
      dataIndex: "title",
      key: "title",
      width: 20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อ",
      dataIndex: "firstName",
      key: "firstName",
      width: 20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
      width: 20,
      render: (text) => <span>{text}</span>,
    },
    {
        title: "ลบ",
        dataIndex: "deleteS",
        key: "deleteS",
        width: 20,
        render: (func) => ( 
          <Button variant="danger" onClick={func} size="sm" className="font-kanit">
            ลบข้อมูล
          </Button>
        ),
    },
];
