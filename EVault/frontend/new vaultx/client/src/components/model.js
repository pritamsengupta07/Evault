import { useEffect, useState } from "react";
import "./model.css";

const Model = ({ setModelOpen, contract }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModelOpen(false);
    // Refresh the access list after sharing
    fetchAccessList();
  };

  const revoking = async () => {
    if (selectedUser) {
      await contract.disallow(selectedUser);
      setModelOpen(false);
      // Refresh the access list after revoking
      fetchAccessList();
    }
  };

  const fetchAccessList = async () => {
    try {
      const addressList = await contract.shareAccess();
      setAccessList([...addressList]);
    } catch (error) {
      console.error("Error fetching access list:", error);
    }
  };

  useEffect(() => {
    contract && fetchAccessList();
  }, [contract]);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

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
            <select id="selectNumber" onChange={handleSelectChange}>
              <option className="address">People With Access</option>
              {accessList.map((user) => (
                <option key={user.user} value={user.user}>
                  {user.user}
                </option>
              ))}
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
            <button onClick={() => revoking()}>Revoke</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;