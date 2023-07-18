import { Box, LinearProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { URL } from "../API/API";
import axios from "axios";
import TableDisplay from "./Table";
import { getOrder } from "../API/orderApi";

function ModalBox({ id, openFlag, setOpenFlag }) {
  const [orderDetail, setOrderDetail] = useState();
  const [open, setOpen] = useState(true);

  const getOrderDetail = async () => {
    const data = await getOrder(id);
    console.log(data);
    setOrderDetail(data);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: 700,
      md: 400,
      xs: 250,
    },
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getOrderDetail();
  }, []);
  return (
    <Modal
      open={openFlag}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CancelIcon
          onClick={() => setOpenFlag(false)}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: 15,
            top: 10,
          }}
        />
        {orderDetail ? (
          <>
            <h3 style={{ color: "#8056c4" }}>
              Customer Name:{" "}
              <span style={{ fontWeight: 600, color: "#000" }}>
                {orderDetail?.customer_name}
              </span>
            </h3>
            <h3 style={{ color: "#8056c4" }}>
              Customer Name:{" "}
              <span style={{ fontWeight: 600, color: "#000" }}>
                {orderDetail?.date.split(" ")[0]}
              </span>
            </h3>
            <TableDisplay orderDetail={orderDetail} />
          </>
        ) : (
          <LinearProgress color="secondary" style={{ textAlign: "center" }} />
        )}
      </Box>
    </Modal>
  );
}

export default ModalBox;
