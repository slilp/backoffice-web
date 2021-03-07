import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
  } from "react-bootstrap";
  import { Table } from "antd";

  
function TableInvoice() {

  const columns = [
    {
      title: "รหัสใบเสร็จ",
      dataIndex: "invoiceCode",
      key: "invoiceCode",
      width:25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "รหัสสั่งซื้อ",
      dataIndex: "code",
      key: "code",
      width:25,
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
      title: "รอบการชำระเงิน",
      dataIndex: "pay",
      key: "pay",
      width:25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "amount",
      dataIndex: "amount",
      width:25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "สถานะการชำระเงิน",
      dataIndex: "status",
      key: "status",
      width:10,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "เเก้ไข",
      dataIndex: "edit",
      key: "edit",
      width:20,
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
      code: "SO0001",
      invoiceCode: "INV001",
      pay: "12/03/2564",
      name: 'ร้านเทพรัตน์',
      amount: 5000,
      status: "รอการชำระเงิน",
      edit: "เเก้ไข",
    },
    {
      key: "2",
      code: "SO0001",
      invoiceCode: "INV002",
      pay: "15/03/2564",
      name: 'บริษัท ทเวนตี้โฟร์ ช้อปปิ้ง จำกัด (สำนักงานใหญ่)	',
      amount: 5000,
      status: "รอการชำระเงิน",
      edit: "เเก้ไข",
    },
    {
      key: "3",
      code: "SO0002",
      invoiceCode: "INV003",
      name: 'โยนา ชานมไข่มุก',
      pay: "15/03/2564",
      amount: 5000,
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

export default TableInvoice;
