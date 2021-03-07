import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { Table } from "antd";

function TableCustomer() {
  const columns = [
    {
      title: "รหัสลูกค้า",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ประเภท",
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ที่อยู่",
      dataIndex: "location",
      key: "location",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "โซน",
      dataIndex: "zone",
      key: "zone",
      render: (text) => <span >{text}</span>,
    },
    {
      title: "เเก้ไข",
      dataIndex: "edit",
      key: "edit",
      render: (text) => <Button variant="primary" size="sm" className="font-kanit">เเก้ไข</Button>,
    },
  ];

  const handleTableChange = async (pagination, filters, sorter) => {};

  const onChangeChannel = async (e) => {};
  const dataSource = [
    {
      key: '1',
      code: 'CS0001',
      name: 'ร้านเทพรัตน์',
      location: '295 ถนน สรงประภา แขวง ดอนเมือง ดอนเมือง กรุงเทพมหานคร 10210',
      tel: '0858137775	',
      zone: '1',
      type:'INVV',
      edit: 'เเก้ไข'
    },
    {
      key: '2',
      code: 'CS0002',
      name: 'บริษัท ทเวนตี้โฟร์ ช้อปปิ้ง จำกัด (สำนักงานใหญ่)	',
      location: '119 อาคารธาราสาทร ชั้น9-10 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120	',
      tel: '026482400	',
      zone: '1',
      type:'INV',
      edit: 'เเก้ไข'
    },
    {
      key: '3',
      code: 'CS0003',
      name: 'โยนา ชานมไข่มุก',
      location: '119 อาคารธาราสาทร ชั้น9-10 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120	',
      tel: '0919193646',
      zone: '2',
      type:'INV',
      edit: 'เเก้ไข'
    },
  ];

  return (
    <>
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          <Card.Header>
            <Card.Title as="h4" className="font-kanit">
              รายชื่อลูกค้า
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

export default TableCustomer;
