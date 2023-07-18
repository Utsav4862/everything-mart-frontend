import { Button, Container, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrder } from "../API/orderApi";
import TableDisplay from "./Table";
import ReactToPrint from "react-to-print";

function Invoice() {
  const { state } = useLocation();
  const { id } = state;
  const componentRef = useRef();
  const [orderDetail, setOrderDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderDetail = async () => {
    setIsLoading(true);
    const data = await getOrder(id);
    console.log(data);
    setOrderDetail(data);
    setIsLoading(false);
  };

  const getDate = (dt) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    //03/08/2019
    let month = parseInt(dt.slice(0, 2)) - 1;
    let day = dt.slice(3, 5);
    let year = dt.slice(6, 10);
    let d = new Date(year, month, day);
    console.log(d);
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  };

  const styles = {
    box: {
      backgroundColor: "#f1e7f9",
      width: "50%",
      //   marginLeft: -20,
      marginTop: 10,
      padding: 20,
      borderRadius: 10,
    },

    heading: {
      fontSize: 24,
      color: "#8056c4",
      fontWeight: "500",
    },
    no: {
      fontWeight: "600",
      color: "gray",
    },
    date: {
      letterSpacing: 1,
      fontWeight: "bold",
    },
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <Container
            maxWidth="md"
            style={{ marginTop: 10, paddingTop: 15 }}
            ref={componentRef}
          >
            <div>
              <h2 style={{ textAlign: "center" }}>Invoice</h2>
              <div style={{ display: "flex", gap: 15, padding: 10 }}>
                <div>
                  <p style={styles.no}>Invoice No#</p>
                  <p style={styles.no}>Date</p>
                </div>
                <div>
                  <p style={styles.date}>{orderDetail?.order_id}</p>
                  <p style={styles.date}>
                    {orderDetail ? getDate(orderDetail.date) : ""}
                  </p>
                </div>
              </div>
            </div>

            <Container maxWidth="" style={{ display: "flex", gap: 10 }}>
              <Container style={styles.box}>
                <p style={styles.heading}>Billed By</p>
                <p style={{ fontWeight: "600" }}>EveryThing Mart</p>
                <p>United States of Americe (USA)</p>
              </Container>
              <Container style={styles.box}>
                <p style={styles.heading}>Billed To</p>
                <p style={{ fontWeight: "600" }}>
                  {orderDetail?.customer_name}
                </p>
                <p>United States of Americe (USA)</p>
              </Container>
            </Container>
            <TableDisplay orderDetail={orderDetail} />
          </Container>
          <ReactToPrint
            variant="outlined"
            style={{ textAlign: "center", width: "100%" }}
            trigger={() => (
              <Button
                style={{
                  fontWeight: "400",
                  fontSize: 15,
                  color: "#fff",
                  backgroundColor: "#2abd6e",
                }}
              >
                Print this out!
              </Button>
            )}
            content={() => componentRef.current}
          />
        </>
      )}
    </Container>
  );
}

export default Invoice;
