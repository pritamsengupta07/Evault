import { useState } from "react";
import axios from "axios";
import "./fileupload.css";

function FileUpload({ contract, provider, account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) { 
        throw new Error("Please select a file to upload");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: "ede5d39f5db34311e4d9",
            pinata_secret_api_key: "36c5d83be1a48c58433e7332b41785803be50cfc26774044740da93a88f1ff7e",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const ImgHash = `ipfs://${response.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        await signer.add(account, ImgHash);//store this

        alert("Successfully Uploaded");
        setFileName("No image selected");
        setFile(null);
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
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
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
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" disabled={!file || loading} className="upload">
          {loading ? "Uploading..." : "Upload file"}
        </button>
      </form>
    </div>
  );
}

export default FileUpload;























// import { useState } from "react";
// import axios from "axios";
// import "./fileupload.css";

// function FileUpload({ contract, provider, account }) {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!file) {
//         throw new Error("Please select a file to upload");
//       }

//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         formData,
//         {
//           headers: {
//             pinata_api_key: "5fd60c34491ac0a74a43",
//             pinata_secret_api_key: "ff41ae2287d79a3e2a0fbd3f2d66cf49b602cb8f2449dd96ae3ffd198b18cc3b",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         const ImgHash = `ipfs://${response.data.IpfsHash}`;
//         const signer = contract.connect(provider.getSigner());
//         await signer.add(account, ImgHash);

//         alert("Successfully Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } else {
//         console.error(`Failed to upload file. Status: ${response.status}`);
//         throw new Error(`Failed to upload file. Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error.message);
      
//       if (error.response && error.response.status === 403) {
//         alert("Authorization error: Check your Pinata API key and secret");
//       } else {
//         alert(`Error sending file to IPFS: ${error.message}`);
//       }
//     }
//   };

//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };

//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;


// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `Enter Your Key`,
//             pinata_secret_api_key: `Enter Your Secret Key`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         contract.add(account,ImgHash);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default FileUpload;
