import { screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import TransaksiPage from "../pages/Transaksi/TransaksiPage"

Enzyme.configure({ adapter: new Adapter() })

describe("TransaksiPage", () => {
  test("There is a Cari Agen button", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <TransaksiPage />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Cari Agen")).toBeInTheDocument()
    })
  })

  test("There is an input Jenis Transaksi", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <TransaksiPage />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByLabelText("Jenis Transaksi")).toBeInTheDocument
    })
  })

  test("There is an input Nominal Transaksi", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <TransaksiPage />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByLabelText("Nominal Transaksi")).toBeInTheDocument
    })
  })

  test("There is an input Alamat Saat Ini", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <TransaksiPage />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByLabelText("Alamat Saat Ini")).toBeInTheDocument
    })
  })

  test("Added new transaction", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <TransaksiPage />
      </QueryClientProvider>
    )
    const created_date = "30 September 2021, 11:33 PM"
    const jenis_transaksi = "report"
    const provinsi_customer = "Jawa Tengah"
    const kabupaten_customer = "Kudus"
    const kecamatan_customer = "Kaliwungu"
    const alamat_lengkap = "Jl. Kartini No. 3"
    const nominal_transaksi = "450000"
    const status = "0"

    const wrapper = shallow(
      <TransaksiPage
        handleTransaksi={(state) => {
          expect(state.created_date).to.be.equal(created_date)
          expect(state.jenis_transaksi).to.be.equal(jenis_transaksi)
          expect(state.provinsi_customer).to.be.equal(provinsi_customer)
          expect(state.kabupaten_customer).to.be.equal(kabupaten_customer)
          expect(state.kecamatan_customer).to.be.equal(kecamatan_customer)
          expect(state.alamat_lengkap).to.be.equal(alamat_lengkap)
          expect(state.nominal_transaksi).to.be.equal(nominal_transaksi)
          expect(state.status).to.be.equal(status)
        }}
      />
    )
    wrapper.setState({
      created_date: "30 September 2021, 11:33 PM",
      jenis_transaksi: "report",
      provinsi_customer: "Jawa Tengah",
      kabupaten_customer: "Kudus",
      kecamatan_customer: "Kaliwungu",
      alamat_lengkap: "Jl. Kartini No. 3",
      nominal_transaksi: "450000",
      status: "0",
    })
    wrapper.find("Cari Agen").simulate("click")
  })
})
