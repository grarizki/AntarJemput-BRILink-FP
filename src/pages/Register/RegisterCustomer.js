import React, {useState, useCallback, useEffect} from "react"
import { Form, Input, Button, Col, Typography } from "antd"
import { useHistory } from "react-router-dom"

import useCreateCustomer from "../../Mutations/useCreateCustomer"
import "./Register.css"

const { Title } = Typography

const RegisterCustomer = () => {
  const history = useHistory()
  const [customerState, setCustomerState] = useState({
    username: " ",
    password: " ",
    name: " ",
    noHandphone: " "
  })

  const { mutate : registerCustomer} = useCreateCustomer(customerState, (result) => {
    //FIXME: Bug route customer ke home agent
    console.log("success mutation >> ", result)
    history.push("/")
  })
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")



  const changePassword = (e) => {
    const value = e.target.value
    console.log("value >>", value)
    setPassword(value)
    if (!value) {
      setErrorPassword("Password tidak boleh kosong")
    } else if (value.length < 8) {
      setErrorPassword("Password min harus 8 Karakter")
    } else {
      setErrorPassword("")
    }
    setCustomerState({
      ...customerState,
      password: e.target.value,
    })
  }

  const changeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    console.log("value >>", value)
    console.log("password >>", password)
    if (!value) {
      setErrorConfirmPassword("Konfirmasi Password tidak boleh kosong")
    } else if (password != value) {
      setErrorConfirmPassword("password tidak cocok")
    } else {
      setErrorConfirmPassword("")
    }
  }
  // const handleRegisterCustomerBtn = useCallback(() => {
  //   history.push("/")
  // }, [history])

  return (
    <div className="outer-login">
      <div className="inner-login">
        <div className="logo" style={{ marginTop: "0", marginBottom: "45px" }}>
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          layout="vertical"
          name="normal_Register"
          className="login-Register"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            name="nama"
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
              name="nama"
              onChange={(event) => {
                console.log("value >> ", customerState)
                setCustomerState({
                  ...customerState,
                  name: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            name="nomor-handphone"
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
              name="nomor-handphone"
              onChange={(event) => {
                console.log("value >> ", customerState)
                setCustomerState({
                  ...customerState,
                  noHandphone: event.target.value,
                })
              }}
            />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              name="username"
              onChange={(event) => {
                console.log("value >> ", customerState)
                setCustomerState({
                  ...customerState,
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
              minLength="8"
              type="password"
              placeholder="Masukan Password"
              name="password"
              onChange={changePassword}
              //FIXME: Bug password error message
              //TODO: SWAL ERROR MESSAGE
            />
            {errorPassword && <p className="text-danger">{errorPassword}</p>}
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
              minLength="8"
              type="password"
              placeholder="Ulangi Password"
              name="password"
              onChange={changeConfirmPassword}
            />

            {errorConfirmPassword && (
              <p className="text-danger">{errorConfirmPassword}</p>
            )}
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
              <Button className="btn-registerAgenCustomer" onClick={registerCustomer} >
                Register Customer
              </Button>
            </Col>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterCustomer
