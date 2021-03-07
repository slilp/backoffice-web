import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";

function TableDelivery() {
  const columns = [
    {
      title: "รหัสการสั่งซื้อ",
      dataIndex: "code",
      key: "code",
      width:20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อลูกค้า",
      dataIndex: "name",
      key: "name",
      width:20,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ที่อยู่จัดส่ง",
      dataIndex: "location",
      key: "location",
      width:100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ที่อยู่ขนส่ง",
      dataIndex: "deliveryLocation",
      dataIndex: "deliveryLocation",
      width:100,
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
      name: "ร้านเทพรัตน์",
      location: "295 ถนน สรงประภา แขวง ดอนเมือง ดอนเมือง กรุงเทพมหานคร 10210",
     deliveryLocation:''  || '-',
      type: "จัดส่งเอง",
      edit: "เเก้ไข",
    },
    {
      key: "2",
      code: "SO0002",
      name: "บริษัท ทเวนตี้โฟร์ ช้อปปิ้ง จำกัด (สำนักงานใหญ่)	",
      location:
        "119 อาคารธาราสาทร ชั้น9-10 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120	",
      deliveryLocation:'' || '-',
      type: "จัดส่งเอง",
      edit: "เเก้ไข",
    },
    {
      key: "3",
      code: "SO0003",
      name: "โยนา ชานมไข่มุก",
      location:
        "119 อาคารธาราสาทร ชั้น9-10 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120	",
      deliveryLocation:'สายใต้ใหม่ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120',
      type: "ส่งที่ขนส่ง",
      edit: "เเก้ไข",
    },
  ];

  return (
    <>
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          <Card.Header>
            <Card.Title as="h4" className="font-kanit">
              รายการข้อมูลการจัดส่ง
            </Card.Title>
            {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
          </Card.Header>
          <Card.Body className="table-full-width table-responsive px-0">
            <Table
              columns={columns}
              dataSource={dataSource}
              onChange={handleTableChange}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default TableDelivery;
