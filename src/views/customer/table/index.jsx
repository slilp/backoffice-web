import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getParam } from "../../../axios";
import { Table } from "antd";

const reloadData = async (search, page, size) => {
  const res = await getParam(`/customer/search/${page}/${size}/`, {
    name: search.sName || '',
    cid: search.sCode || '',
    type: search.sType || '',
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.cid,
          code: item.cid,
          name: item.name,
          location: item.location,
          tel: item.tel,
          type: item.type,
        };
      });

      return { list: data, total: res.data.data.count };
    } else {
      return [];
    }
  }
};

function TableCustomer({ sCode, sName, sType }) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();

  const columns = [
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

  useEffect(async () => {
    console.log('search');
    const res = await reloadData({sCode,sName,sType},0, 10);
    setDataSource(res.list);
    setPagination({
      total: res.total - 1,
      current: 1,
      indentSize: 10,
      showSizeChanger: false,
    });
  }, [sCode,sName,sType]);

  const handleTableChange = async (pagination, filters, sorter) => {
    const res = await reloadData(
      { sCode, sName, sType },
      pagination.current - 1,
      pagination.pageSize
    );
    setDataSource(res.list);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
  };

  return (
    <>
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          <Card.Header>
            <Card.Title as="h4" className="font-kanit">
              รายชื่อลูกค้า
            </Card.Title>
          </Card.Header>
          <Card.Body className="table-full-width table-responsive px-0">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default TableCustomer;
