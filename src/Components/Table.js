import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function TableDisplay({ orderDetail, flag }) {
  const styles = {
    cell: {
      fontSize: 18,
    },

    head: {
      color: "#fff",
      fontWeight: 600,
      fontSize: 18,
    },
  };

  return (
    <TableContainer style={{ marginTop: 25, borderRadius: 15 }}>
      <Table sx={{ minWidth: 650 }} style={{ borderRadius: 30 }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "#8056c4" }}>
            <TableCell align="center" style={styles.head}>
              #
            </TableCell>
            <TableCell align="left" style={styles.head}>
              Item
            </TableCell>
            <TableCell align="center" style={styles.head}>
              Quantity
            </TableCell>
            <TableCell align="center" style={styles.head}>
              Price
            </TableCell>
            <TableCell align="center" style={styles.head}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetail?.items.map((it, i) => (
            <TableRow
              key={it._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{
                backgroundColor: (i + 1) % 2 === 0 ? "#f1e7f9" : "",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={styles.cell}
              >
                {i + 1}
              </TableCell>
              <TableCell align="left" style={styles.cell}>
                {it.name}
              </TableCell>
              <TableCell align="center" style={styles.cell}>
                {it.qnt}
              </TableCell>
              <TableCell align="center" style={styles.cell}>
                $ {it.unit_price}
              </TableCell>
              <TableCell align="center" style={styles.cell}>
                $ {parseFloat(it.qnt * it.unit_price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          {flag ? (
            <TableRow>
              <TableCell colspan="3" r align="right">
                <h2>Total (USD)</h2>
              </TableCell>
              <TableCell colspan="2" align="right" style={{ paddingRight: 5 }}>
                <h2>$ {orderDetail?.amount.toFixed(2)}</h2>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableDisplay;
