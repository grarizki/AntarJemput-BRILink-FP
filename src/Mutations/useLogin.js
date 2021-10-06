import { useMutation } from "react-query";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useLogin = (loginData, onSuccess, onError) => {
 
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/users`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(loginData), // body data type must match "Content-Type" header
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      
      cookies.set('accessToken', result.accessToken, { path: '/' });
     
      return result;
    },
    { onError, onSuccess }
  );

  return { mutate, data, isLoading, isError };
};

export default useLogin;
