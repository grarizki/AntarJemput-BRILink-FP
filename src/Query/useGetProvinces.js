import { useQuery } from "react-query"


const useGetProvinces = () => {
    const fetchData = async () => {
        const response = await fetch(`http://147.139.193.211:8080/locations/provinces`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        return response.json()
    }

    const { data, isLoading, isError, refetch } = useQuery(
        `provinces:`,
        fetchData,
        {
            cacheTime: 0,
        }
    )


    return { data, isLoading, isError, refetch }
}

export default useGetProvinces
