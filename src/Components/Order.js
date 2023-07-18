import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalBox from "./ModalBox";

function Order() {
  const { state } = useLocation();

  const { orders } = state;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const handleModal = (order) => {
    setOpen(true);
    setData(order);
  };
  const handleInvoiceBtn = (invoiceData) => {
    navigate("/invoice", { state: { id: invoiceData._id } });
  };

  const styles = {
    cell: {
      fontWeight: 600,
      fontSize: 18,
    },
    head: {
      color: "#fff",
      fontWeight: 600,
      fontSize: 18,
    },
  };

  return (
    <div>
      <Container>
        <TableContainer style={{ marginTop: 25 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#8056c4" }}>
                <TableCell align="center" style={styles.head}>
                  Order Id
                </TableCell>
                <TableCell align="right" style={styles.head}>
                  Customer Name
                </TableCell>
                <TableCell align="right" style={styles.head}>
                  Order Date
                </TableCell>
                <TableCell align="right" style={styles.head}>
                  Total Amount
                </TableCell>
                <TableCell align="right" style={styles.head}>
                  Generate Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((od) => (
                <TableRow
                  key={od._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                    align="center"
                    onClick={() => handleModal(od)}
                  >
                    {od.order_id}
                  </TableCell>
                  <TableCell align="right" style={styles.cell}>
                    {od.customer_name}
                  </TableCell>
                  <TableCell align="right" style={styles.cell}>
                    {od.date.split(" ")[0]}
                  </TableCell>
                  <TableCell align="right" style={styles.cell}>
                    $ {parseFloat(od.amount).toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "green",
                      fontSize: 18,
                    }}
                    onClick={() => handleInvoiceBtn(od)}
                  >
                    {" "}
                    Invoice
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open ? (
          <ModalBox id={data._id} openFlag={open} setOpenFlag={setOpen} />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default Order;
