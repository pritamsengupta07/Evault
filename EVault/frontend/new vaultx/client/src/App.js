// // Import necessary components and libraries
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/upload.sol/Upload.json";
import FileUpload from "./components/fileupload";
import Display from "./components/display";
import Model from "./components/model";
import Home from "./components/Landingpage/Home";
import UserProfile from "./components/UserProfile";
import ReactModal from "react-modal";
import JudgeDashboard from "./components/JudgeDashboard";
import "./App.css";

function App() {
  const [loginClicked, setLoginClicked] = useState(false);

  const handleLoginClick = () => {
    // Set loginClicked to true when the login button is clicked
    setLoginClicked(true);
  };
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
  const handleShareClick = () => {
    setModelOpen(true);
    setIsFormOpen(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <div className="wrapper">
              <div className="navbar1">
                <a href="#">Dashboard</a>
                <Link to="http://localhost:8000/logout">
                <button className="logout">
                  Logout
                </button>
                </Link>
              </div>
              <div className="buttons-container">
                  <div className="share-section">
                    <h3>Share</h3>
                    <div className="icon4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40"
                        width="40"
                        viewBox="0 0 576 512"
                        fill="#DC3545"
                      >
                        <path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z" />
                      </svg>
                    </div>

                    {!ModelOpen && (
                      <button
                        className="share"
                        onClick={() => setModelOpen(true)}
                      >
                        Share
                      </button>
                    )}
                    {ModelOpen && (
                      <Model setModelOpen={setModelOpen} contract={contract} />
                    )}
                  </div>

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
                      <button className="uploadbutton" onClick={setIsOpen}>
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
                        <div className="uploadcontent">
                          <div className="ac">
                          
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                          {" "}
                          {" "}
                           Account: {account ? account : "Not connected"}
                            </div>
                          
                          <div className="uploadcontentf">
                            <FileUpload
                              account={account}
                              provider={provider}
                              contract={contract}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="upclosebutton">
                            <button id="close"onClick={() => setIsOpen(false)}>
                              Cancel
                            </button>
                          </div>

                          {/* Add more content or components as needed */}
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
      <button  className="uploadbutton"onClick={setIsfetchOpen}>Fetch</button>
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
        <div className="emicon">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        </div>
        <Display contract={contract} account={account} />
        <div className="upclosebutton">
                            <button id="close"onClick={() => setIsfetchOpen(false)}>
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
                    <a href="#">Dashboard</a>
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
          }
        />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/judge_dashboard" element={<JudgeDashboard />} />

      </Routes>
      <div className="footer">
        <footer>
          TEAM VaultX <br></br>
          &copy;ALL RIGHTS RESERVED
        </footer>
      </div>
    </Router>
  );
}

export default App;
