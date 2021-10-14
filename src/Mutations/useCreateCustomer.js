import { useMutation } from "react-query"

import Cookies from "universal-cookie"

const cookies = new Cookies()

const useCreateCustomer = (registerCusData, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      try {
        const response = await fetch(`http://localhost:5000/customer`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(registerCusData), // body data type must match "Content-Type" header
        })

        if (response.ok) {
          console.log("ini response ", response)

          const result = await response.json()

          cookies.set("accessToken", result.accessToken, { path: "/" })

          return result
        }
        const errorResult = await response.json()
        throw new Error(errorResult)
      } catch (error) {
        throw new Error(error)
      }
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useCreateCustomer
