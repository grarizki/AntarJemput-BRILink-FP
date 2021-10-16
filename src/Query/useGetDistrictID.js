import { useQuery } from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useGetDistrictID = (id = "") => {
  const fetchData = async () => {
    const response = await fetch(
      `http://35.229.233.212/locations/districts?regencyId=${id}`,
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

  const { dataDistrictID, isLoadingDistrictID, isErrorDistrictID } = useQuery(
    `districtID:`,
    fetchData,
    {
      cacheTime: 0,
    }
  )

  return { dataDistrictID, isLoadingDistrictID, isErrorDistrictID }
}

export default useGetDistrictID
