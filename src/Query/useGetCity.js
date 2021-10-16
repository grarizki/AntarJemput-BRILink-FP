import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetCity = (id = "") => {
  const fetchData = async () => {
    const response = await fetch(
      `http://35.229.233.212/locations?provinceId=${id}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + cookies.get("accessToken"),
        }),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    return response.json()
  }

  const { dataCity, isLoadingCity, isErrorCity } = useQuery(`city:`, fetchData, {
    cacheTime: 0,
  })

  return { dataCity, isLoadingCity, isErrorCity }
}

export default useGetCity
