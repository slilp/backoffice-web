import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
  } from "react-bootstrap";
import { Table } from "antd";

function TableProduction() {

  const columns = [
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
      render: (text) => <Button variant="primary" size="sm" className="font-kanit">เเก้ไข</Button>,
    },
  ];

  const handleTableChange = async (pagination, filters, sorter) => {};

  const onChangeChannel = async (e) => {};
  const dataSource = [
    {
      key: '1',
      code: 'SO0001',
      name: 'ร้านเทพรัตน์',
      revenue:  50000,
      edit: 'เเก้ไข'
    },
    {
      key: '2',
      code: 'SO0002',
      name: 'บริษัท ทเวนตี้โฟร์ ช้อปปิ้ง จำกัด (สำนักงานใหญ่)	',
      revenue:  50000,
      edit: 'เเก้ไข'
    },
    {
      key: '3',
      code: 'SO0003',
      name: 'โยนา ชานมไข่มุก',
      revenue:  50000,
      edit: 'เเก้ไข'
    },
  ];

    return (
        <>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">รายการผลิต</Card.Title>
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
        </>
    )
}

export default TableProduction
