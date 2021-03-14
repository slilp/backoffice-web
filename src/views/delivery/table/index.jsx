import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";
import { columns } from "./column";
import { searchData } from "./service";

function TableDelivery({ sCode, sName, sType }) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();
  const columnsTable = columns;
  const reloadData = searchData;

  useEffect(async () => {
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
              pagination={pagination}
              onChange={handleTableChange}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default TableDelivery;
