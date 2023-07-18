import { Button, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../API/API";
import "./style.css";

function Upload() {
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const [isProgress, setIsProgress] = useState(false);

  const handleFileInput = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadCSV = async () => {
    setIsProgress(true);

    let fd = new FormData();
    fd.append("file", file);

    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    let { data } = await axios.post(`${URL}/order/upload`, fd, config);
    setIsProgress(false);
    navigate("/orders", { state: { orders: data } });
  };
  return (
    <>
      {isProgress ? <LinearProgress color="secondary" /> : ""}

      <div className="upload-wrapper">
        <div className="inner-box">
          <div className="upload-btn">
            <Button
              variant="outlined"
              component="label"
              style={{ fontWeight: "600", margin: "auto", color: "#8056c4" }}
            >
              Upload CSV File
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileInput}
              />
            </Button>
            <b style={{ marginLeft: 5, marginTop: 3 }}>
              {file !== undefined ? file.name : ""}
            </b>
          </div>
          <Button
            variant="outlined"
            style={{
              fontWeight: "400",
              fontSize: 15,
              color: "#fff",
              backgroundColor: "#2abd6e",

              width: "100%",
            }}
            disabled={file === undefined ? true : false}
            onClick={uploadCSV}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Upload;
