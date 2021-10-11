import { useHistory } from "react-router-dom"
import Cookies from "universal-cookie"
import Swal from "sweetalert2"
// import { Redirect } from "react-router-dom";
import { useAuthorizedContext } from "../../AuthorizedContext"


const cookies = new Cookies()

function Logout() {
  const { isLoggedIn, setAuthorizedValue } = useAuthorizedContext()

  const history = useHistory()

  Swal.fire({
    title: "Konfirmasi",
    text: "Anda yakin ingin keluar?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Ya",
    confirmButtonColor: "#292961",
    cancelButtonColor: "#292961",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Logout Sukses",
        showConfirmButton: false,
        timer: 1500,
      })
      setAuthorizedValue(false, null)
      cookies.remove("accessToken")
      history.replace("/")
    } else {
    }
  })
}

export default Logout
