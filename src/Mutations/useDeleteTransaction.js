import { useMutation } from "react-query";
import Cookies from "universal-cookie";

// const cookies = new Cookies();

const useDeleteTransaction = (deleteId, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/transactions/${deleteId}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer " + cookies.get("accessToken"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    { onError, onSuccess }
  );

  return { mutate, data, isLoading, isError };
};

export default useDeleteTransaction;
