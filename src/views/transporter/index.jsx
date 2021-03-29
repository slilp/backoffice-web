import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TableTransporter from "./table";
import { Formik } from "formik";

function Transporter() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12" className="p-3">
            <Button
              className="btn-fill pull-right"
              variant="warning"
              onClick={() => history.push("/admin/addt")}
            >
              <i className="far fa-plus-square mr-1"></i>
              เพิ่มพนักงานขนส่งใหม่
            </Button>
          </Col>
          <TableTransporter></TableTransporter>
        </Row>
      </Container>
    </div>
  );
}

export default Transporter;
