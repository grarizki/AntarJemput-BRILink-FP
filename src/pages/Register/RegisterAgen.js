import React, { useState, useMemo } from "react"
import { Row, Form, Input, Button, Select, Col, Typography } from "antd"
import { useHistory } from "react-router-dom"

import DataAlamat from "../Transaksi/DataAlamat"
import useCreateAgen from "../../Mutations/useCreateAgen"
import "./Register.css"

const { Option } = Select
const { Title } = Typography

const RegisterAgen = () => {
  const history = useHistory()
  const [selectedProvinsi, setSelectedProvinsi] = useState(null)
  const [selectedKabupaten, setSelectedKabupaten] = useState(null)
  const [selectedKecamatan,setSelectedKecamatan] = useState(null)
  const [agentState, setAgentState] = useState({
    username: "",
    password: "",
    agentName: "",
    noHandphone: "",
    districtId: "",
    address: "",
  })

  const { mutate} = useCreateAgen(
    agentState,
    (result) => {
      console.log("success mutation >> ", result)
      history.push("/")
    }
  )

  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value)
  }

  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value)
  }

  const handleSelectedKecamatan = (value) => {
    setSelectedKecamatan(value)
  }

  const handleFormProvinsi = (value) => {
    setAgentState({ ...agentState, province: value })
  }
  const handleFormKabupaten = (value) => {
    setAgentState({ ...agentState, city: value })
  }
  const handleFormKecamatan = (value) => {
    setAgentState({ ...agentState, district: value })
  }

  const dataKabupaten = useMemo(() => {
    return (
      DataAlamat?.find((provinsi) => provinsi.name === selectedProvinsi)
        ?.kabupaten || []
    )
  }, [selectedProvinsi])

  const dataKecamatan = useMemo(() => {
    return (
      dataKabupaten?.find((kabupaten) => kabupaten.name === selectedKabupaten)
        ?.kecamatan || []
    )
  }, [selectedKabupaten, dataKabupaten])


  const [password, setPassword]                 = useState('');
  const [errorPassword, setErrorPassword]       = useState('');
  const [confirmPassword, setConfirmPassword]   = useState('');
  const [errorConfirmPassword,setErrorConfirmPassword] = useState('');

  const changePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    if (!value){
      setErrorPassword('Password tidak boleh kosong')
    } else if (value.length < 8 ){
      setErrorPassword('Password min harus 8 Karakter')
    } else {
      setErrorPassword('')
    }
    
  }

  const changeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (!value){
      setErrorConfirmPassword('Konfirmasi Password tidak boleh kosong')
    } else if (password !== value) {    
      setErrorConfirmPassword('password tidak cocok') 
    } else {
      setErrorPassword('')
    }
  }

  return (
    <div className="outer-register">
      <div className="inner-register">
        <div className="logo" style={{ marginTop: "0", marginBottom: "45px" }}>
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          name="normal_register"
          className="register-form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="Nama"
            label="Nama"
            rules={[
              {
                required: true,
                message: "Kolom nama tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Nama"
              name="Nama"
              onChange={(event) => {
                console.log("value >> ", agentState)
                setAgentState({
                  ...agentState,
                  agentName: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            name="Alamat"
            style={{ marginBottom: " 8px", padding: "0px" }}
            label="Alamat"
            rules={[
              {
                required: true,
                message: "Kolom alamat tidak boleh kosong!",
              },
            ]}
          >
            <Row justify="space-between" style={{ marginBottom: "10px" }}>
              <Col span={7}>
                <Select
                  placeholder="Pilih Provinsi"
                  onChange={(e) => {
                    handleSelectedProvinsi(e)
                    handleFormProvinsi(e)
                  }}
                >
                  {DataAlamat.map((provinsi, index) => (
                    <Option key={index.toString()} value={provinsi.name}>
                      {provinsi.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={7}>
                <Select
                  placeholder="Pilih Kabupaten"
                  onChange={(e) => {
                    handleSelectedKabupaten(e)
                    handleFormKabupaten(e)
                  }}
                >
                  {dataKabupaten.map((kabupaten, index) => (
                    <Option key={index.toString()} value={kabupaten.name}>
                      {kabupaten.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={7}>
                <Select
                  name="Alamat"
                  placeholder="Pilih Kecamatan"
                  onChange={(e) => {
                    handleSelectedKecamatan(e)
                    handleFormKecamatan(e)
                  }}
                >
                  {dataKecamatan.map((kecamatan, index) => (
                    <Option key={index.toString()} value={kecamatan}>
                      {kecamatan}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="alamat-Kantor"
            label="Alamat Kantor"
            rules={[
              {
                required: true,
                message: "Kolom Alamat Kantor tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Detail Alamat Kantor Anda"
              name="alamat-Kantor"
              onChange={(event) => {
                console.log("value >> ", agentState)
                setAgentState({
                  ...agentState,
                  address: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="Nomor-Handphone"
            label="Nomor Handphone"
            rules={[
              {
                required: true,
                message: "Kolom Nomor Handphone tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Nomor Handphone"
              name="Nomor-Handphone"
              onChange={(event) => {
                console.log("value >> ", agentState)
                setAgentState({
                  ...agentState,
                  noHandphone: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Kolom Username tidak boleh kosong!",
              },
            ]}
          >
            <Input
              placeholder="Masukkan Username"
              name="Username"
              onChange={(event) => {
                console.log("value >> ", agentState)
                setAgentState({
                  ...agentState,
                  username: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: " 8px", padding: "0px" }}
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                // message: "Please input your Password!",
              },
            ]}
          >
            <Input 
            minLength='8'
            type="password" 
            placeholder="Masukan Password" 
            name="password"
            value= {password} 
            onChange= {changePassword, (event) => {
              console.log("value >> ", agentState)
              setAgentState({
                ...agentState,
                password: event.target.value,
              })
            }}/>
            {
              errorPassword && (
                <p className="text-danger">{errorPassword}</p>
              )
            }
            
          </Form.Item>
          <Form.Item
            name="konfirmasi-password"
            label="Konfirmasi Password"
            rules={[
              {
                required: true,
                // message: "Please input your Password!",
              },
            ]}
          >
            <Input
            minLength='8' 
            type="password" 
            placeholder="Ulangi Password" 
            name="password"
            value= {confirmPassword}
            onChange= {changeConfirmPassword}/>

            {
              errorConfirmPassword && (
               <p className="text-danger">{errorConfirmPassword}</p>
              )
            }

          </Form.Item>
          <Form.Item>
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="btn-registerAgenCustomer" onClick={mutate}>
                Register Agen
              </Button>
            </Col>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterAgen
