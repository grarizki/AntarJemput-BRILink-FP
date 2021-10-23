import { useMutation } from "react-query"
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"

const useCreateAgent = (agent, onSuccess, onError) => {
  const history = useHistory()
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BE_AGENTS}`,
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(agent), // body data type must match "Content-Type" header
          }
        )
        if (response.ok) {
          const result = await response.json()
          Swal.fire({
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
          })
          history.push('/')
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

export default useCreateAgent
