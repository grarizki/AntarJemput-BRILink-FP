import React, { useState, useMemo } from "react"
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  InputNumber,
  Input,
  Spin,
  Table,
  Typography,
  Space,
} from "antd"
import { useHistory } from "react-router-dom"

import JenisTransaksi from "./DataJenisTransaksi"
import useGetAgen from "../../Query/useGetAgen"
import useGetProvinces from "../../Query/useGetProvinces"
import useGetCity from "../../Query/useGetCity"
import useGetDistrictID from "../../Query/useGetDistrictID"
import useCreateTransaction from "../../Mutations/useCreateTransaction"
import NavbarComponent from "../../components/navbar/NavbarComponent"
import "./TransaksiPage.css"

const { Option } = Select
const { Text } = Typography

const TransaksiPage = () => {
  const [selectedProvinsi, setSelectedProvinsi] = useState(null)
  const [selectedKabupaten, setSelectedKabupaten] = useState(null)
  const [selectedDistrictID, setSelectedDistrictID] = useState(null)
  const [showTableAgen, setShowTableAgen] = useState(false)
  const history = useHistory()
  const [formState, setFormState] = useState({
    agentId: "",
    address: "",
    districtId: "",
    amount: "",
    transactionTypeId: "",
  })
  console.log("formstate >>", formState)

  const { mutate, isLoading, isError } = useCreateTransaction(
    formState,
    (result) => {
      console.log("success mutation >> ", result)
      history.replace("/home")
    }
  )

  const {
    data,
    isError: isErrorAgent,
    isLoading: isLoadingAgent,
  } = useGetAgen(selectedDistrictID)
  const {
    data: dataProvinces,
    isLoading: isLoadingProvinces,
    isError: isErrorProvinces,
  } = useGetProvinces()
  const {
    data: dataCity,
    isLoading: isLoadingCity,
    isError: isErrorCity,
  } = useGetCity(selectedProvinsi)
  const {
    data: dataDistrictID,
    isLoading: isLoadingDistrictID,
    isError: isErrorDistrictID,
  } = useGetDistrictID(selectedKabupaten)

  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0"
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("id-ID").format(1111).replace(/1/g, "")
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "")
      //  => 1232.21

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "")
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length
      const needsDigitsAppended = digitsAfterDecimalCount > 2

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2)
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value)
  }

  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value)
  }

  const handleSelectedDistrictID = (value) => {
    setSelectedDistrictID(value)
  }
  const handleFormDistrictID = (value) => {
    setFormState({ ...formState, districtId: value })
    console.log(formState)
    console.log(value)
  }

  const handleCreateTransactions = (value) => {
    setFormState({ ...formState, agentId: value })
    console.log("formState", formState)
  }

  const getTableAgen = () => setShowTableAgen(true)

  const ColumnsAgen = [
    {
      title: "Nama Agen",
      dataIndex: "agentName",
      key: "agentName",
      align: "center",
    },
    {
      title: "Nomer Whatsapp",
      dataIndex: "noHandphone",
      key: "noHandphone",
      align: "center",
      render: (text) => (
        <Button type="link" href={"https://wa.me/62" + text}>
          {text}
        </Button>
      ),
    },
    {
      title: "Alamat Agen",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "agentRating",
      key: "agentRating",
      align: "center",
      render: (agentRating) =>
        isNaN(agentRating) ? 0 : Math.floor(agentRating * 100) / 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        // !!! KURANG MUTATION
        // !!! MUTATION DIBUAT DI SWEET ALERT
        <Button type="link" onClick={() => handleCreateTransactions(record.key)}>
          Pilih Agen
        </Button>
      ),
    },
  ]

  return (
    <div>
      <NavbarComponent />
      <div className="formTransaksi" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ paddingTop: "100px" }}>
              <Form style={{ width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Jenis Transaksi"
                  name="Jenis Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <Select
                      placeholder="Pilih Jenis Transaksi"
                      onChange={(value) => {
                        setFormState({ ...formState, transactionTypeId: value })
                      }}
                    >
                      {JenisTransaksi.map((option) => (
                        <Option
                          key={option.key}
                          value={option.value}
                          disabled={option.isDisabled}
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Nominal Transaksi"
                  name="Nominal Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(value)
                      }
                      parser={currencyParser}
                      onChange={(value) => {
                        setFormState({
                          ...formState,
                          amount: value,
                        })
                        console.log("value >> ", formState)
                      }}
                    />
                  </Col>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Alamat Saat Ini"
                  name="address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Row justify="space-between" style={{ marginBottom: "10px" }}>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Provinsi"
                        onChange={(e) => {
                          handleSelectedProvinsi(e)
                        }}
                      >
                        {dataProvinces?.map((provinces, id) => (
                          <Option key={id.toString()} value={provinces.id}>
                            {provinces.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kabupaten"
                        onChange={(e) => {
                          handleSelectedKabupaten(e)
                        }}
                      >
                        {dataCity?.map((city, id) => (
                          <Option key={id.toString()} value={city.id}>
                            {city.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kecamatan"
                        onChange={(e) => {
                          handleSelectedDistrictID(e)
                          handleFormDistrictID(e)
                        }}
                      >
                        {dataDistrictID?.map((district, id) => (
                          <Option key={id.toString()} value={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Input.TextArea
                      onChange={(event) => {
                        setFormState({
                          ...formState,
                          address: event.target.value,
                        })
                        console.log("value >> ", formState)
                      }}
                    />
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              className="searching-agent"
              style={{ marginTop: "50px" }}
              onClick={getTableAgen}
            >
              Cari Agen
            </Button>
          </Row>
        </div>

        <div style={{ margin: "50px 0" }}>
          <Row justify="center">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <Space align="center" direction="vertical" size="large">
                <Text style={{ color: "red" }}> Gagal memilih Agen</Text>
                <Table
                  columns={ColumnsAgen}
                  dataSource={data?.map((row) => ({
                    agentName: row.agent.agentName,
                    noHandphone: row.agent.noHandphone,
                    address: row.agent.address,
                    agentRating: row.agent.agentRating,
                    key: row.id,
                  }))}
                  pagination={false}
                />
              </Space>
            ) : (
              showTableAgen && (
                <Table
                  value
                  columns={ColumnsAgen}
                  dataSource={data?.map((row) => ({
                    agentName: row.agent.agentName,
                    noHandphone: row.agent.noHandphone,
                    address: row.agent.address,
                    agentRating: row.agent.agentRating,
                    key: row.id,
                  }))}
                  pagination={false}
                />
              )
            )}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default TransaksiPage
