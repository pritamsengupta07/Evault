import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Upload from "../artifacts/contracts/upload.sol/Upload.json";
import FileUpload from "./fileupload"; // Import FileUpload component
import Display from "./display";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from "axios";

const JudgeDashboard = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ModelOpen, setModelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isfetchOpen, setIsfetchOpen] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (!provider) {
          console.error("Metamask is not installed");
          return;
        }

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error("Error loading blockchain data:", error.message);
      }
    };

    loadBlockchainData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="wrapper">
      <div className="navbar1">
        <a href="#">Judge Dashboard</a>
        <Link to="http://localhost:8000/logout">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </div>
      <div className="buttons-container">
        <div className="get-data-section">
          <h3>Upload</h3>
          <div className="icon4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 512 512"
              fill="#FFC107"
            >
              <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </div>

          <div>
            <button className="uploadbutton" onClick={() => setIsOpen(true)}>
              Upload
            </button>
            <ReactModal
              isOpen={isOpen}
              contentLabel="Example Modal"
              style={{
                content: {
                  // Set the desired height
                  marginLeft: "280px",
                  width: "65%",
                  marginRight: "20px", // Center the modal
                },
              }}
            >
              {/* Add the upload content and form here */}
              <div className="uploadcontent">
                <div className="ac">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>{" "}
                  {" "}
                  Account: {account ? account : "Not connected"}
                </div>

                {/* Add the upload form component */}
                <div className="uploadcontentf">
                  {/* Use FileUpload component */}
                  <FileUpload
                    account={account}
                    provider={provider}
                    contract={contract}
                  />
                </div>
              </div>
              <div>
                <div className="upclosebutton">
                  <button id="close" onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </ReactModal>
          </div>

          <div className="bg"></div>
        </div>

        <div className="display-section">
          <h3>Fetch</h3>
          <div className="icon4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 512 512"
              fill="#198745"
            >
              <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM127 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 136c0-13.3 10.7-24 24-24s24 10.7 24 24l0 182.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 393c-9.4 9.4-24.6 9.4-33.9 0L127 281z" />
            </svg>
          </div>
          <div>
            <button
              className="uploadbutton"
              onClick={() => setIsfetchOpen(true)}
            >
              Fetch
            </button>
            <ReactModal
              isOpen={isfetchOpen}
              contentLabel="Example Modal"
              style={{
                content: {
                  // Set the desired height
                  marginLeft: "280px",
                  width: "65%",
                  marginRight: "20px", // Center the modal
                },
              }}
            >
              {/* Add the fetch content and display component here */}
              <div className="emicon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
              {/* Display component */}
              <Display contract={contract} account={account} />
              <div className="upclosebutton">
                <button id="close" onClick={() => setIsfetchOpen(false)}>
                  Cancel
                </button>
              </div>
            </ReactModal>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <h1>VaultX</h1>
        <ul>
          <li>
            <a href="#">Judge Dashboard</a>
          </li>
          <li>
            <Link to="/user-profile">User Profile</Link>
          </li>
          <li>
            <a href="#">Transaction</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JudgeDashboard