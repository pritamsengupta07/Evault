import { useState } from "react";
import axios from "axios";
import "./fileupload.css";

function FileUpload({ contract, provider, account }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: "3346cb37c4e32497fed4",
            pinata_secret_api_key: "83b62a62a491ff4d1bded9ba63bdcd189cb234175343462a06f1c234416827e5",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const imgHash = `ipfs://${response.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        await signer.add(account, imgHash);

        // Store metadata about the file, such as name or unique identifier
        const fileMetadata = { hash: response.data.IpfsHash, name: file.name };
        setFiles([...files, fileMetadata]);

        alert("Successfully Uploaded");
      } else {
        console.error(`Failed to upload file. Status: ${response.status}`);
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);

      if (error.response && error.response.status === 403) {
        alert("Authorization error: Check your Pinata API key and secret");
      } else {
        alert(`Error sending file to IPFS: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    handleFileUpload(data);
  };

  return (
    <div className="top">
      <form className="form">
        <label htmlFor="file-upload" className="choose">
          Choose Document
        </label>
        <input
          disabled={!account || loading}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        {files.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span>
            {/* Include UI for managing access for each file */}
            {/* You can add buttons or checkboxes here for access control */}
          </div>
        ))}
        <button type="submit" disabled={loading} className="upload">
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
}

export default FileUpload;