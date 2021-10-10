import React, { useCallback } from "react"
import { Typography, Row, Col, Form, Button, Card } from "antd"
import moment from "moment"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import { useHistory } from "react-router-dom"

const { Title, Text } = Typography

const CardComponent = (props) => {
    

    const history = useHistory()
    const { mutate: deleteTransaction } = useDeleteTransaction(
      props.transaction.id,
      props.refetchTransactions
    )
  
    const handleRate = useCallback(() => {
      history.push("/rate");
    }, [])
  
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
                  ? "Dibatalkan Customer"
                  : props.transaction.status === "3"
                  ? "Selesai"
                  : "Error"}
              </Text>
            </Col>
          </Row>
  
          <div className="float-right">
          {
             props.transaction.status === "0" || props.transaction.status === "1" ?
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
            : props.transaction.status === "3"  ?
            <Button className="btn btn-primary" onClick={handleRate}> Beri Rating  </Button>
            : <Button> Hapus</Button>

            } 
           
          </div>
        </Form>
      </Card>
    )
  }

  export default CardComponent;