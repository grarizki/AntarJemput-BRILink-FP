import { useMutation } from "react-query"

import Cookies from "universal-cookie"
import Swal from "sweetalert2";
const cookies = new Cookies()

const useCreateCustomer = (registerCusData, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      try {
        const response = await fetch(`http://bc3d-103-3-222-249.ngrok.io/customers`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(registerCusData), // body data type must match "Content-Type" header
        })

        if (response.ok) {
          const result = await response.json()
          // cookies.set("accessToken", result.accessToken, { path: "/" })
          Swal.fire({
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
          })
          history.push("/")
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