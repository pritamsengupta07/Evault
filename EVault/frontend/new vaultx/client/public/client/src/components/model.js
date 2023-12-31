

import { useEffect, useState } from "react";
import "./model.css";

const Model = ({ setModelOpen, contract }) => {
  const [selectedFile, setSelectedFile] = useState(""); // Track the selected file

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address, selectedFile);
    setModelOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const accessData = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");

      // Clear existing options
      select.innerHTML = '<option value="" disabled>Select a file</option>';

      // Populate options with file URLs
      for (const fileUrl in accessData) {
        let opt = fileUrl;
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            />
          </div>
          <form id="myForm">
            <select
              id="selectNumber"
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              <option value="" disabled>Select a file</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModelOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
