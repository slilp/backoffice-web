import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";

function TableLogistic() {
  const columns = [
    {
      title: "รหัสใบเสร็จ",
      dataIndex: "invoiceCode",
      key: "invoiceCode",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "รอบการจัดส่ง",
      dataIndex: "deliver",
      key: "deliver",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อลูกค้า",
      dataIndex: "name",
      key: "name",
      width:25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "สถานะการจัดส่ง",
      dataIndex: "status",
      key: "status",
      width: 25,
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

  const handleTableChange = async (pagination, filters, sorter) => {};

  const onChangeChannel = async (e) => {};
  const dataSource = [
    {
      key: "1",
      invoiceCode: "INV001",
      deliver: "12/03/2564",
      name: 'ร้านเทพรัตน์',
      status: "รอการชำระเงิน",
      edit: "เเก้ไข",
    },
    {
      key: "2",
      invoiceCode: "INV002",
      deliver: "15/03/2564",
      name: 'บริษัท ทเวนตี้โฟร์ ช้อปปิ้ง จำกัด (สำนักงานใหญ่)	',
      status: "รอการชำระเงิน",
      edit: "เเก้ไข",
    },
    {
      key: "3",
      invoiceCode: "INV003",
      deliver: "15/03/2564",
      name: 'โยนา ชานมไข่มุก',
      status: "ชำระเงินเเล้ว",
      edit: "เเก้ไข",
    },
  ];

  return (
    <>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">รายการใบเสร็จเเละการจัดส่ง</Card.Title>
          {/* <p className="card-category">Here is a subtitle for this table</p> */}
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table
            columns={columns}
            dataSource={dataSource}
            onChange={handleTableChange}
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default TableLogistic;
