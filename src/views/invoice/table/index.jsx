import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Table } from "antd";
import { getParam } from "../../../axios";

const reloadData = async (search, page, size) => {
  const res = await getParam(`/invoice/search/${page}/${size}/`, {
    inv: search.sInv || "",
    pid: search.sPid || "",
    status: search.sStatus || "",
    startDate: search.sStartDate || "",
    endDate: search.sEndDate || "",
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.inv,
          pid: item.purchaseInfo.pid,
          invoiceCode: item.inv,
          pay: item.invoiceDate,
          name:  item.purchaseInfo.customerInfo.name,
          amount: item.amount ,
          status: item.status == "waiting" ? "รอการชำระเงิน" : "ชำระเงินเเล้ว",
          edit: "เเก้ไข",
        };
      });

      return { list: data, total: res.data.data.count };
    } else {
      return [];
    }
  }
};

function TableInvoice({ sInv, sPid, sStatus , sStartDate , sEndDate }) {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState();

  const columns = [
    {
      title: "รหัสใบเสร็จ",
      dataIndex: "invoiceCode",
      key: "invoiceCode",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "รหัสสั่งซื้อ",
      dataIndex: "pid",
      key: "pid",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "ชื่อลูกค้า",
      dataIndex: "name",
      key: "name",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "รอบการชำระเงิน",
      dataIndex: "pay",
      key: "pay",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "amount",
      dataIndex: "amount",
      width: 25,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "สถานะการชำระเงิน",
      dataIndex: "status",
      key: "status",
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
    const res = await reloadData({ sInv, sPid, sStatus , sStartDate , sEndDate }, 0, 10);
    setDataSource(res.list);
    setPagination({
      total: res.total - 1,
      current: 1,
      indentSize: 10,
      showSizeChanger: false,
    });
  }, [sPid, sInv, sStatus , sStartDate , sEndDate]);

  const handleTableChange = async (pagination, filters, sorter) => {
    const res = await reloadData(
      { sInv, sPid, sStatus , sStartDate , sEndDate },
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
