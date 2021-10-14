// import { useMutation } from "react-query";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

// const useUpdateTransaction = (transaction, onSuccess, onError) => {
//   const { mutate, data, isLoading, isError } = useMutation(
//     async (transaction) => {
//         // const data = {
//         // id: values.id,
//         // title: values.title,
//         // body: values.body,
//         // userId: values.userId
//       }
//       const response = await fetch(`http://localhost:5000/transactions${transaction.id}`, {
//         method: "PUT", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + cookies.get("accessToken"),
//         },
//         redirect: "follow", // manual, *follow, error
//         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(transaction), // body data type must match "Content-Type" header
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     },
//     { onError, onSuccess }
//   );

//   return { mutate, data, isLoading, isError };
// };

// export default useUpdateTransaction;
