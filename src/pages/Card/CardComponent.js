import React, {useCallback, useState} from "react"
import {Button, Card, Modal, Rate} from "antd"
import moment from "moment"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import {useHistory} from "react-router-dom"
import {faBan, faSmile, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2"
import "../CardAgent/CardAgent.css"
import useUpdateTransaction from "../../Mutations/useUpdateTransaction";
import RateComponent from "../Rating/RateComponent";

const CardComponent = (props) => {
    const history = useHistory()
    const [currentValue, setCurrentValue] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const {mutate: deleteTransaction} = useDeleteTransaction(
        props.transaction.id,
        props.refetchTransactions
    )

    const handleRate = useCallback(() => {
        history.push("/rate");
    }, [])

    const handleDeleteTransactions = useCallback(() => {
        console.log("id transaction >> ", props.transaction.id);
        console.log("transaction ", props.transaction)
        Swal.fire({
            title: 'Anda yakin ingin menghapus transaksi ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus !'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTransaction()
                Swal.fire(
                    'Berhasil',
                    'Transaksi telah dihapus.',
                    'success'
                )
            }
        })


    }, [deleteTransaction])


    const {mutate: updateTransaction} = useUpdateTransaction(
        props.transaction.id,
        {statusTransaction: 2},
        props.refetchTransactions,
    )


    const handleUpdateTransaction = useCallback(() => {
        if (updateTransaction()) {
            Swal.fire({
                icon: "success",
                title: "Transaksi Dibatalkan",
                showConfirmButton: false,
                timer: 2000,
            })
            history.push("/home")
        }
    }, [updateTransaction])

    const handleDelete = () => {
        Swal.fire({
            title: 'Anda yakin ingin menghapus transaksi ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus !'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Berhasil',
                    'Transaksi telah dihapus.',
                    'success'
                )
            }
        })
    }

    return (
        <Card style={{
            width: 450,
            border: "2px solid black",
            marginBottom: "20px"
        }}>
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
                    ? "Menunggu konfirmasi agen"
                    : props.transaction.statusTransaction === 1
                        ? "Agen dalam perjalanan"
                        : props.transaction.statusTransaction === 2
                            ? "Dibatalkan Customer"
                            : props.transaction.statusTransaction === 3
                                ? "Selesai"
                                : "Error"}
                </li>
            </ul>


            <div className="float-right">
                {
                    props.transaction.statusTransaction === 0 ?
                        <Button
                            type="primary"
                            style={{
                                margin: "0px",
                                paddingRight: "15px",
                                backgroundColor: "brown",
                                fontWeight: "bold",
                                borderRadius: "10px",
                                marginLeft: "50px"
                            }}

                            onClick={updateTransaction}
                        >
                            <FontAwesomeIcon icon={faBan} style={{marginRight: "5px"}}/>
                            Batalkan
                        </Button>

                        : props.transaction.statusTransaction === 3 ?
                            !props.transaction.rating ?
                                <>
                                    <Button style={{
                                        margin: "0px",
                                        color: "white",
                                        paddingRight: "15px",
                                        backgroundColor: "blue",
                                        fontWeight: "bold",
                                        borderRadius: "10px",
                                        marginLeft: "50px"
                                    }} onClick={showModal}>

                                        <FontAwesomeIcon icon={faSmile} style={{marginRight: "5px"}}/>Beri Rating </Button>
                                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk}
                                           onCancel={handleCancel}>
                                        <RateComponent transaction={props.transaction}/>
                                    </Modal>
                                </>
                                : (
                                    <>
                       <Button disabled={true} style={{marginLeft:"30px", border:"2px solid #292961", fontWeight:"bold",
                           color:"black", borderRadius:"10px"}}>
                           Anda telah memberikan Penilaian</Button>
     </>
       )
       : props.transaction.statusTransaction === 2 ?
             <Button style={{
           backgroundColor: "red",
          color: "white",
          fontWeight: "bold", borderRadius: "10px", paddingRight: "15px", margin: "0px", marginLeft: "50px"}}
          onClick={handleDeleteTransactions}> <FontAwesomeIcon icon={faTrashAlt} style={{marginRight: "5px"}}/> Hapus
      </Button> :
            <p></p>
                }

            </div>
        </Card>
    )
}

export default CardComponent;