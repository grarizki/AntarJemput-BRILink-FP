import { Button, Rate, Typography , Progress} from "antd"
import React, { useState } from "react"
import "./Rate.css"
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
          Review Customers
        </Text>{" "}
        <br /> <br />
          {props.transaction.rating ? (
              <span>
          <Text
              style={{marginLeft: "100px", fontWeight: "bold", fontSize: "30px"}}
          >
            {" "}
              {props.transaction.rating}
          </Text>
          <Text> / 5</Text> <br/>
          <Rate
              value={props.transaction.rating}
              style={{marginRight: "15px", marginLeft: "70px"}}
          />
        </span>
          ) :(
              <> Customer Belum Memberikan Rating </>
              )
          } <br />
        {/*<Progress percent={30} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={50} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={70}  strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={30} strokeColor={'#F9E926'}/>*/}
        {/*<Progress percent={50} strokeColor={'#F9E926'}/>*/}
        {/*<br /> <br />*/}
        {/*<Button*/}
        {/*  style={{*/}
        {/*    backgroundColor: "#292961 ",*/}
        {/*    borderRadius: "10px",*/}
        {/*    color: "white",*/}
        {/*    marginTop: "30px",*/}
        {/*    alignContent: "center",*/}
        {/*  }}*/}
        {/*  onClick={handleBack}*/}
        {/*>*/}
        {/*  {" "}*/}
        {/*  KEMBALI KE HALAMAN UTAMA*/}
        {/*</Button>*/}
      </div>
    </div>
  )
}

export default RatingAgent
