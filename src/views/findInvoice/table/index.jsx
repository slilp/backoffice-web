import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";
import { getParam } from "../../../axios";
import { columns } from "./column";
import { searchData } from "./service";

function TableInvoice({ sPid ,  handleSelect } ) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();
  const [refresh,setRefresh] =useState(false);
  const reloadData = searchData;

  useEffect(async () => {
    console.log('ddd');
    const res = await reloadData(
      {sPid},
      0,
      10,
      handleSelect
    );
    setDataSource(res.list);
    setPagination({
      total: res.total - 1,
      current: 1,
      indentSize: 10,
      showSizeChanger: false,
    });
  }, [sPid, refresh]);

  const handleTableChange = async (pagination, filters, sorter) => {
    const res = await reloadData(
      { sInv, sPid, sStatus, sStartDate, sEndDate },
      pagination.current - 1,
      pagination.pageSize,
      handleSelect
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
          <Card.Title as="h4">รายการใบเสร็จเเละการจัดส่ง</Card.Title>
          {/* <p className="card-category">Here is a subtitle for this table</p> */}
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

export default TableInvoice;
