import { useState } from "react";
import "./display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;


// import { useState } from "react";
// import "./display.css";

// const Display = ({ contract, account }) => {
//   const [data, setData] = useState("");
  
//   const getdata = async () => {
//     const Otheraddress = document.querySelector(".address").value;
    
//     try {
//       let dataArray;
//       if (Otheraddress) {
//         dataArray = await contract.Display(Otheraddress);
//         console.log(dataArray);
//       } else {
//         dataArray = await contract.Display(account);
//       }

//       if (Array.isArray(dataArray) && dataArray.length > 0) {
//         const str_array = dataArray.map((item) => (
//           <a href={item} key={item} target="_blank" rel="noopener noreferrer">
//             <img
//               src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
//               alt="new"
//               className="imagelist"
//             />
//           </a>
//         ));

//         setData(str_array);
//       } else {
//         alert("No image to display");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
      
//       if (error.response && error.response.status === 403) {
//         alert("Authorization error: Check your contract access permissions");
//       } else {
//         alert(`Failed to fetch data: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="imagelist">{data}</div>
//       <input type="text" className="address" placeholder="Enter address" />
//       <button className="center button" onClick={getdata}>
//         Get Data
//       </button>
//     </>
//   );
// };

// export default Display;


// import { useState } from "react";
// import "./display.css"
// const Display=({contract,account})=> {
//     const [data , setData]= useState("");
//     const getdata = async ()=>{
//         let dataArray;
//         const Otheraddress = document.querySelector(".address").value;
//         try {
//             if (Otheraddress) {
//                 dataArray = await contract.Display(Otheraddress);
//                 console.log(dataArray);
//             }else {
//             dataArray=await contract.Display(account);
//             }
//         } catch (e) {
//         alert("You don't have access");
//         }
//         const isEmpty = Object.keys(dataArray).length===0;

//         if(!isEmpty) {
//             const str = dataArray.toString();
//             const str_array = str.split(",");
//             const images =str_array.map((item,i)=>{
//                 return(
//                     <a href={item} key={i} target="_blank">
//                         <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
//                         alt="new" className="imagelist"></img>
//                     </a>
//                 );
//             });
//             setData(images);
            
//         }else {
//             alert("no image to display");
//         }
//     };

//     return (
//     <>
//     <div className="imagelist">{data}</div>
//     <input type="text" className="address" placeholder="enter address"></input>
//     <button className="center button" onClick={getdata}>get data</button>
//     </>
//     );  
// }
// export default Display;

// import { useState } from "react";
// import "./display.css";

// const Display = ({ contract, account }) => {
//   const [data, setData] = useState("");
  
//   const getdata = async () => {
//     const Otheraddress = document.querySelector(".address").value;
    
//     try {
//       let dataArray;
//       if (Otheraddress) {
//         dataArray = await contract.Display(Otheraddress);
//         console.log(dataArray);
//       } else {
//         dataArray = await contract.Display(account);
//       }

//       if (Array.isArray(dataArray) && dataArray.length > 0) {
//         const str_array = dataArray.map((item) => (
//           <a href={item} key={item} target="_blank" rel="noopener noreferrer">
//             <img
//               src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
//               alt="new"
//               className="imagelist"
//             />
//           </a>
//         ));

//         setData(str_array);
//       } else {
//         alert("No image to display");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
      
//       if (error.response && error.response.status === 403) {
//         alert("Authorization error: Check your contract access permissions");
//       } else {
//         alert(`Failed to fetch data: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="imagelist">{data}</div>
//       <input type="text" className="address" placeholder="Enter address" />
//       <button className="center button" onClick={getdata}>
//         Get Data
//       </button>
//     </>
//   );
// };

// export default Display;


// import { useState } from "react";
// import "./display.css"
// const Display=({contract,account})=> {
//     const [data , setData]= useState("");
//     const getdata = async ()=>{
//         let dataArray;
//         const Otheraddress = document.querySelector(".address").value;
//         try {
//             if (Otheraddress) {
//                 dataArray = await contract.Display(Otheraddress);
//                 console.log(dataArray);
//             }else {
//             dataArray=await contract.Display(account);
//             }
//         } catch (e) {
//         alert("You don't have access");
//         }
//         const isEmpty = Object.keys(dataArray).length===0;

//         if(!isEmpty) {
//             const str = dataArray.toString();
//             const str_array = str.split(",");
//             const images =str_array.map((item,i)=>{
//                 return(
//                     <a href={item} key={i} target="_blank">
//                         <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
//                         alt="new" className="imagelist"></img>
//                     </a>
//                 );
//             });
//             setData(images);
            
//         }else {
//             alert("no image to display");
//         }
//     };

//     return (
//     <>
//     <div className="imagelist">{data}</div>
//     <input type="text" className="address" placeholder="enter address"></input>
//     <button className="center button" onClick={getdata}>get data</button>
//     </>
//     );  
// }
// export default Display;