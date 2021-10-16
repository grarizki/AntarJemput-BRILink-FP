import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetProvinces = () => {
  const fetchData = async () => {
    const response = await fetch(`http://35.229.233.212/locations/provinces`, {
      headers: new Headers({
        Authorization: "Bearer " + cookies.get("accessToken"),
      }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  }

  const { dataProvinces, isLoadingProvinces, isErrorProvinces } = useQuery(
    `provinces:`,
    fetchData,
    {
      cacheTime: 0,
    }
  )

  return { dataProvinces, isLoadingProvinces, isErrorProvinces }
}

export default useGetProvinces
