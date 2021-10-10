import { useMutation } from "react-query";
import Cookies from 'universal-cookie';
import Swal from "sweetalert2"

const cookies = new Cookies();

const useLogin = (loginData, onSuccess, onError) => {
  console.log("ini login", loginData)
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`https://wulan-belajar.herokuapp.com/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(loginData), // body data type must match "Content-Type" header
      });
      
      if (response.ok) {
        Swal.fire({
          icon:'success',
          title:'Login Success',
          showConfirmButton:false,
          timer:2000
        })
        console.log("ini response ", response)
       
      } else{
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
