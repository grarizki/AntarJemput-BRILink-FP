import { useMutation } from "react-query"
import Cookies from "universal-cookie"
import Swal from "sweetalert2"

const cookies = new Cookies()

const useLogin = (loginData, onSuccess, onError) => {
  console.log("ini login", loginData)
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      try {
        const response = await fetch(`https://wulan-belajar.herokuapp.com/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(loginData), // body data type must match "Content-Type" header
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

export default useLogin
