import React, { useCallback } from "react"
import { Row, Col, Form, Button, Card, Typography, Spin, Space, Alert } from "antd"
import moment from "moment"

import "./Home.css"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"

const { Title, Text } = Typography

const CardTransactionComponent = (props) => {
  const { mutate: deleteTransaction } = useDeleteTransaction(
    props.transaction.id,
    props.refetchTransactions
  )

  const handleCancelTransaction = useCallback(() => {
    // console.log("id transaction >> ", props.transaction.id);
    deleteTransaction()
  }, [deleteTransaction])

  return (
    <Card title=" ">
      <Form style={{ marginLeft: "10%" }}>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Waktu Request </Text>
          </Col>
          <Col offset={0} style={{ width: "65%" }}>
            <Text>
              {" "}
              :{" "}
              {moment(new Date(props.transaction.created_date)).format(
                "DD MMMM YYYY, hh:mm A"
              )}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Jenis Transaksi</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>: {props.transaction.jenis_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Nominal Transaksi</Text>
          </Col>
          <Col sstyle={{ width: "65%" }}>
            <Text> : Rp{props.transaction.nominal_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Alamat Anda</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text> : {props.transaction.alamat_lengkap} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Status</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>
              :{" "}
              {props.transaction.status === "0"
                ? "Menunggu konfirmasi agen"
                : props.transaction.status === "1"
                ? "Agen dalam perjalanan"
                : props.transaction.status === "2"
                ? "Dibatalkan agen"
                : props.transaction.status === "3"
                ? "Selesai"
                : "Error"}
            </Text>
          </Col>
        </Row>

        <div className="float-right">
          <Button
            type="primary"
            style={{
              margin: "0px",
              paddingRight: "15px",
              backgroundColor: "#F03D3E",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
            onClick={handleCancelTransaction}
          >
            Batalkan
          </Button>
        </div>
      </Form>
    </Card>
  )
}

function Home() {
  const { isLoggedIn, userLevel } = useAuthorizedContext()
  console.log("value >> ", isLoggedIn, userLevel)
  const {
    data,
    isError,
    isLoading,
    refetch: refetchTransactions,
  } = useGetTransaction()
  console.log("data >> ", isLoading, data)
  return (
    <div className="outer-home">
      <NavbarComponent />
      <div className="statusTransaksi">
        <div className="title">
          <Title>Transaksi Saat Ini:</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : isError ? (
              <Alert message="Gagal Memuat Data" type="error" />
            ) : (
              data.map((transaction) => (
                <CardTransactionComponent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Home
