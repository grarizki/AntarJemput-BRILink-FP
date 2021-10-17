import { Button, Rate, Typography } from 'antd';
import React, { useState } from "react"
import "./Rate.css"
import {useHistory} from "react-router-dom";
import useCreateRate from "../../Mutations/useCreateRate";
import useGetTransaction from "../../Query/useGetTransaction";

const desc = ["Sangat Buruk", "Buruk", "OK", "Hampir Sempurna", "Sempurna"]

const { Text } = Typography

function RateComponent(props) {
  const [currentValue, setCurrentValue] = useState(0)
   const history = useHistory()

  const handleChange = (value) => {
    setCurrentValue(value)
  }

  const handleBack = () => {
    history.push("/home")     
  }

  const { mutate: createRate } = useCreateRate(
        props.transaction.id,
        {rating: currentValue},
        props.refetchTransactions

  )

    return (
    <div className="outer-rate">
      <div className="inner-rate">
        {/* <h4> Terima Kasih! </h4> */}
        <Text style={{textAlign:"center", color:"#292961", fontWeight:"bold", fontSize:"24px", marginBottom:"30px"}}>
             Transaksi Anda Telah Selesai</Text> <br /> <br />
        <Text style={{marginTop:"20px", fontSize:"20px"}}> Beri Rating Untuk Agent Kami ?</Text>
        <hr />
        <span>
          <Rate onChange={handleChange} value={currentValue} /> <br /> <br />
          Current Rating: {currentValue}
          {currentValue ? (
            <span className="ant-rate-text">{desc[currentValue - 1]}</span>
          ) : (
            ""
          )}
        </span>{" "}
        <br /> <br />

        <Button style={{marginBottom:"30px"}} onClick={createRate}> Kirim </Button> <br />
        <Button  style={{ backgroundColor: "#292961 " , borderRadius:"10px", color:"white"}}
       onClick = {handleBack}
       >
          {" "}
          KEMBALI KE HALAMAN UTAMA
        </Button>
      </div>
    </div>
  )
}

export default RateComponent
