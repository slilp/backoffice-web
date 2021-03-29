import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TableSale from "./table";
import { Formik } from "formik";

function Sell() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12" className="p-3">
            <Button
              className="btn-fill pull-right"
              variant="warning"
              onClick={() => history.push("/admin/adds")}
            >
              <i className="far fa-plus-square mr-1"></i>
              เพิ่มพนักงานขายใหม่
            </Button>
          </Col>
          <TableSale></TableSale>
        </Row>
      </Container>
    </div>
  );
}

export default Sell;
