import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";
import { getParam } from "../../../axios";

const reloadData = async (search, page, size) => {
  const res = await getParam(`/purchase/search/${page}/${size}/`, {
    name: search.sName || "",
    pid: search.sCode || "",
    transportType: search.sType || "",
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.pid,
          code: item.pid,
          name: item.customerInfo.name,
          revenue: item.revenue
        };
      });

      return { list: data, total: res.data.data.count };
    } else {
      return [];
    }
  }
};

function TableProduction({ sCode, sName, sType }) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();

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
      render: (text) => (
        <Button variant="primary" size="sm" className="font-kanit">
          เเก้ไข
        </Button>
      ),
    },
  ];

  useEffect(async () => {
    console.log("search");
    const res = await reloadData({ sCode, sName, sType }, 0, 10);
    setDataSource(res.list);
    setPagination({
      total: res.total - 1,
      current: 1,
      indentSize: 10,
      showSizeChanger: false,
    });
  }, [sCode, sName, sType]);

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
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default TableProduction;
