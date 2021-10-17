import React, {useState} from "react"
import {Button, Card, Modal, Rate, Typography} from "antd"
import moment from "moment"
// import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import Swal from "sweetalert2"
import "./CardAgent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faCheck,
    faClipboardCheck,
    faEye,
    faTimesCircle,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"
import {useHistory} from "react-router-dom"
import useUpdateTransaction from "../../Mutations/useUpdateTransaction";



const {Text} = Typography
const CardAgent = (props) => {
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);

    // const { mutate: deleteTransaction } = useDeleteTransaction(
    //   props.transaction.id,
    //   props.refetchTransactions
    // )
    // const handleCancelTransaction = useCallback(() => {
    //   // console.log("id transaction >> ", props.transaction.id);
    //   deleteTransaction()
    // }, [deleteTransaction])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const {mutate: acceptedTransaction} = useUpdateTransaction(
        props.transaction.id,
        {statusTransaction: 1},
        props.refetchTransactions,
    )

    const {mutate: doneTransaction} = useUpdateTransaction(
        props.transaction.id,
        {statusTransaction: 3},
        props.refetchTransactions,
    )

    const {mutate: rejectedTransaction} = useUpdateTransaction(
        props.transaction.id,
        {statusTransaction: 2},
        props.refetchTransactions,
    )

    const handleDelete = () => {
        Swal.fire({
            title: "Anda yakin ingin menghapus transaksi ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus !",
        }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Berhasil", "Transaksi telah dihapus.", "success")
                }
            }
        )
    }



    return (
        <Card
            style={{
                width: 450,
                border: "2px solid black",
                marginBottom: "20px",
            }}
        >
            <Text style={{color:"#4B0082", fontWeight:"bold"}}> Nama Customer : {props.transaction.userCustomer.customer.Name}</Text>
            <br/> <br/>
            <hr />
            <ul className="alignMe">
                <li>
                    <b>Waktu Request</b> {moment(new Date(props.transaction.createdAt)).format(
                    "DD MMMM YYYY, hh:mm A")}
                </li>
                <li>
                    <b>Jenis
                        Transaksi</b> {props.transaction.transactionType.serviceTypeTransaction.nameServiceTransaction}
                    - {props.transaction.transactionType.nameTransactionType}
                </li>
                <li>
                    <b>Nominal Transaksi</b>Rp. {props.transaction.amount}
                </li>
                <li>
                    <b>Alamat Anda</b>{props.transaction.address}
                </li>
                <li>
                    <b>Agen BRILink</b> {props.transaction.userAgent.agent.agentName}
                </li>
                <li>
                    <b>Alamat Agen</b> {props.transaction.userAgent.agent.address}
                </li>
                <li>
                    <b>Status</b> {props.transaction.statusTransaction === 0
                    ? "Menunggu konfirmasi agent"
                    : props.transaction.statusTransaction === 1
                        ? "Agen dalam perjalanan"
                        : props.transaction.statusTransaction === 2
                            ? "Dibatalkan"
                            : props.transaction.statusTransaction === 3
                                ? "Selesai"
                                : "Error"}
                </li>
            </ul>

            <div className="float-right">
                {props.transaction.statusTransaction === 0 ? (
                    <>
                        <Button
                            type="primary"
                            style={{
                                margin: "0px",
                                paddingRight: "15px",
                                backgroundColor: "green",
                                fontWeight: "bold",
                                borderRadius: "10px",
                                marginRight: "80px",
                                marginLeft: "50px",
                            }}
                            onClick={acceptedTransaction}
                        >
                            <FontAwesomeIcon icon={faCheck} style={{marginRight: "5px"}}/>{" "}
                            Terima
                        </Button>

                        <Button
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "10px",
                                paddingRight: "15px",
                                margin: "0px",
                                marginLeft: "50px",

                            }}
                            onClick ={rejectedTransaction}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} style={{marginRight: "5px"}}/>{" "}
                            Tolak
                        </Button>
                    </>
                ) : props.transaction.statusTransaction === 1 ? (
                    <>
                        <Button
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "10px",
                                paddingRight: "15px",
                                margin: "0px",
                                marginLeft: "50px",
                            }}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} style={{marginRight: "5px"}}/>{" "}
                            Batalkan
                        </Button>

                        <Button className="btn btn-primary" style={{marginLeft:"50px"}} onClick={doneTransaction}>
                            <FontAwesomeIcon
                                icon={faClipboardCheck}
                                style={{marginRight: "8px"}}
                            />
                            Transaksi Selesai
                        </Button>
                    </>
                ) : props.transaction.statusTransaction === 2 ? (
                    <Button
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            paddingRight: "15px",
                            margin: "0px",
                            marginLeft: "50px",
                        }}
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} style={{marginRight: "5px"}}/>{" "}
                        Hapus
                    </Button>
                ) : (
                    <>
        {props.transaction.rating ? (
          <span>
          <Rate
              value={props.transaction.rating}
              style={{marginRight: "15px", marginLeft: "40px"}}
          />
        </span>
     ) : (
       <Button disabled={true} style={{marginLeft:"30px", border:"2px solid #292961", color:"black", fontWeight:"bold", borderRadius:"10px"}}>
           Belum Ada Penilaian
         </Button>
       )}

   </>
  )}
            </div>
        </Card>
    )
}

export default CardAgent
