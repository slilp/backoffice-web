import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";
import { getParam } from "../../../axios";
import { columns } from "./column";
import { searchData } from "./service";

function TableProduction({ sCode, sName, sStatus }) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();
  const [refresh,setRefresh] = useState(false);
  const columnsTable = columns;
  const reloadData = searchData;

  useEffect(async () => {
    const res = await reloadData({ sCode, sName, sStatus }, 0, 10 , setRefresh);
    setDataSource(res.list);
    setPagination({
      total: res.total - 1,
      current: 1,
      indentSize: 10,
      showSizeChanger: false,
    });
  }, [sCode, sName, sStatus,refresh]);

  const handleTableChange = async (pagination, filters, sorter) => {
    const res = await reloadData(
      { sCode, sName, sStatus },
      pagination.current - 1,
      pagination.pageSize ,
      setRefresh
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
