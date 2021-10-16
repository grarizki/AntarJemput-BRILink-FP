import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetAgen = () => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/agent/`, {
      headers: new Headers({
        Authorization: "Bearer " + cookies.get("accessToken"),
      }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  }

  const { data, isLoadingAgent, isErrorAgent, refetch } = useQuery(
    `agent:`,
    fetchData,
    {
      cacheTime: 0,
    }
  )

  return { data, isLoadingAgent, isErrorAgent, refetch }
}

export default useGetAgen
