import { useState } from "react";
import "./display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getdata = async () => {
    try {
      const otherAddress = document.querySelector(".address").value;
      const dataArray = otherAddress
        ? await contract.display(otherAddress)
        : await contract.display(account);

      console.log("Data Array:", dataArray);

      if (!dataArray || dataArray.length === 0) {
        alert("No image to display");
        return;
      }

      const images = dataArray.map((item, i) => (
        <li key={i}>
          <a href={item} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${encodeURIComponent(item.substring(6))}`}
              alt={`image-${i}`}
              className="imagelist-item"
            />
          </a>
        </li>
      ));

      setData(images);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("You don't have access");
    }
  };

  return (
    <>
      <ul className="imagelist">{data}</ul>
      <input type="text" className="address" placeholder="Enter Address" />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
