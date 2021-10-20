import { Button, Rate, Typography, Progress } from "antd"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const desc = ["terrible", "bad", "normal", "good", "wonderful"]

const { Text } = Typography

function RatingAgent(props) {
  const [currentValue, setCurrentValue] = useState()
  const history = useHistory()

  const handleBack = () => {
    history.push("/home-agent")
  }

  return (
    <div className="outer-rate">
      <div className="inner-rate">
        <Text
          style={{
            textAlign: "center",
            color: "#292961",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "30px",
            marginLeft: "50px",
          }}
        >
          Rating Customer
        </Text>{" "}
        <br /> <br />
        <span>
          <Text
            style={{ marginLeft: "100px", fontWeight: "bold", fontSize: "30px" }}
          >
            {Math.floor(props.transaction.userAgent.agent.agentRating).toFixed(1)}
          </Text>
          <Text> / 5</Text> <br />
          <Rate
            allowHalf
            value={Math.floor(props.transaction.userAgent.agent.agentRating).toFixed(
              1
            )}
            style={{ marginRight: "15px", marginLeft: "70px" }}
          />
        </span>{" "}
        <br /> <br />
        <Text style={{ marginLeft: "100px" }}>
          {props.transaction.userAgent.agent.totalReviewTransactions} Transaksi
        </Text>
        {/*<Progress percent={30} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={50} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={70}  strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={30} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={50} strokeColor={'#F9E926'}/>*/}
        <br /> <br />
        {/*<Button*/}
        {/*    style={{*/}
        {/*        backgroundColor: "#292961 ",*/}
        {/*        borderRadius: "10px",*/}
        {/*        color: "white",*/}
        {/*        marginTop: "30px",*/}
        {/*        alignContent: "center",*/}
        {/*    }}*/}
        {/*    onClick={handleBack}*/}
        {/*>*/}
        {/*    {" "}*/}
        {/*    KEMBALI KE HALAMAN UTAMA*/}
        {/*</Button>*/}
      </div>
    </div>
  )
}

export default RatingAgent
