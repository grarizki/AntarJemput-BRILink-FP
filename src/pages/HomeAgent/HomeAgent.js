import React from "react"
import {
  Typography,
  Spin,
  Space,
  Alert,
} from "antd"

import NavbarComponent from "../../components/navbarAgen/NavbarAgenComp"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import "./HomeAgent.sass"
import CardAgent from "../CardAgent/CardAgent"
import Background from "../../assets/image/white-wave-background-vector.jpg"

const { Title} = Typography



function HomeAgent() {
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
      <div className="statusTransaksi" style={{backgroundImage:`url(${Background})`}}>
        <div className="title">
          <Title style={{fontFamily:"Comic Sans MS, cursive", color:"#292961"}}>Request Transaksi Hari Ini</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : data ? (
              data.map((transaction) => (
                <CardAgent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            ) : (
              <Alert message="Gagal Memuat Data" type="error" />
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HomeAgent