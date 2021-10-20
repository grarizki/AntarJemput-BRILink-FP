import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetAgen = () => {
  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/agent", {
      headers: new Headers({
        Authorization: "Bearer " + cookies.get("accessToken"),
      }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  }

  const { dataAgent, isLoadingAgent, isErrorAgent, refetch } = useQuery(
    `agents:`,
    fetchData,
    {
      cacheTime: 0,
    }
  )

  return { dataAgent, isLoadingAgent, isErrorAgent, refetch }
}

export default useGetAgen
