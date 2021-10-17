import { useMutation } from "react-query"

// const cookies = new Cookies();

const useDeleteTransaction = (deleteId, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(
<<<<<<< HEAD
        `https://wulan-belajar.herokuapp.com/transactions/${deleteId}`,
=======
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BE_TRANSACTIONS}+'${deleteId}'`,
>>>>>>> 382ee64c3953769d7e6fc6136a4e18e5ee2f83f9
        {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + cookies.get("accessToken"),
          },
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useDeleteTransaction
