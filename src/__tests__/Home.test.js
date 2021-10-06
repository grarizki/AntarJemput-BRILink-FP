import Home from "../pages/Home/Home"
import { screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

describe("Home", () => {
  test("There is a Waktu", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Waktu")).toBeInTheDocument()
    })
  })
  
  test("There is a Request", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Request")).toBeInTheDocument()
    })
  })

  test("There is a Jenis Transaksi", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Jenis transaksi")).toBeInTheDocument()
    })
  })

  test("There is a Nominal Transaksi", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Nominal Transaksi")).toBeInTheDocument()
    })
  })

  test("There is a Alamat", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Alamat")).toBeInTheDocument()
    })
  })

  test("There is a Agen", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Agen")).toBeInTheDocument()
    })
  })

  test("There is a Status", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Status")).toBeInTheDocument()
    })
  })

  test("There is a Batalkan button", async () => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText("Batalkan")).toBeInTheDocument()
    })
  })
})
