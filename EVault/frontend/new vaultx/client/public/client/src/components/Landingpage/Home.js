// Home.js

import { Link } from "react-router-dom";
import "./Home.css";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import ImageSlider from "./ImageSlider";

const Home = () => {
  const [loginClicked, setLoginClicked] = useState(false);

   const handleLoginClick = () => {
     // Set loginClicked to true when the login button is clicked
     setLoginClicked(true);
   };
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        {/* <div className="logo-image" style={{ backgroundLogo: `url(${backgroundLogo})` }}></div> */}
        <div className="logo-container">
          <h2>
            <span className="vault">Vault</span>X
          </h2>
        </div>
        <div className="navbar-buttons">
          <Link to="http://localhost:8000/login" onClick={handleLoginClick}>
            <button>Login</button>
          </Link>
          <Link to="http://localhost:8000/registration">
            <button>Register</button>
          </Link>
          {/* Use ScrollLink for smooth scrolling to the "Services" section */}
          <ScrollLink to="servicesSection" smooth={true} duration={800}>
            <button>Services</button>
          </ScrollLink>
        </div>
      </nav>
      <div className="section1">
        <div className="justice">
          <img
            src="m.png" // Replace with the actual path to your image
            alt="Description of the image"
            // Adjust the width and maxWidth as needed
          />
        </div>
        <div className="justice">
          <div className="image-container">
            <img
              src="download.png" // Replace with the actual path to your second image
              alt="Description of the second image"
              // Adjust the width and maxWidth as needed
            />
          </div>
        </div>
        <div className="justice">
          <img
            src="sih.jpeg" // Replace with the actual path to your image
            alt="Description of the image"
            // Adjust the width and maxWidth as needed
          />
        </div>
      </div>

      <div className="pcustom-section"></div>
      <div className="custom-section">
        <div className="slideshow-container">
          <ImageSlider />
        </div>
      </div>

      <div className="carousel-container">
        <div className="logo-slogan">
          <p className="slogan">
            <h2>
              <b>Welcome to VaultX</b>
            </h2>
            <br />
            Your Secure Platform for Managing and Sharing Files
          </p>
        </div>
      </div>

      <div className="services-container" id="servicesSection">
        <div className="service">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 0 512 512"
            fill="#FFC107"
          >
            <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
          <h3>Upload</h3>
          <p>Upload your Files securly to the VaultX platform.</p>
        </div>
        <div className="service">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 0 512 512"
            fill="#198745"
          >
            <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM127 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 136c0-13.3 10.7-24 24-24s24 10.7 24 24l0 182.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 393c-9.4 9.4-24.6 9.4-33.9 0L127 281z" />
          </svg>
          <h3>Retrieve</h3>
          <p>Easily Retrieve your stored files whenever you need them.</p>
        </div>
        <div className="service">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 0 576 512"
            fill="#DC3545"
          >
            <path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z" />
          </svg>

          <h3>Share</h3>
          <p>Share files with others securly using VaultX sharing features.</p>
        </div>
      </div>

      <div className="additional-container">
        <div className="flow">
          <h3>Getting started is quick and easy</h3>
        </div>

        <div className="icon-container">
          <div className="icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <h3>Register</h3>
          </div>
          <div className="icon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 448 512"
            >
              {" "}
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </div>
          <div className="icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 512 512"
            >
              <path d="M48 256C48 141.1 141.1 48 256 48c63.1 0 119.6 28.1 157.8 72.5c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0C114.6 0 0 114.6 0 256v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6c-15.2 5-18.7 23.7-8.3 35.9c7.1 8.3 18.8 10.8 29.4 7.9c10.6-2.9 21.8-4.4 33.4-4.4c70.7 0 128 57.3 128 128v24.9c0 25.2-1.5 50.3-4.4 75.3c-1.7 14.6 9.4 27.8 24.2 27.8c11.8 0 21.9-8.6 23.3-20.3c3.3-27.4 5-55 5-82.7V256c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4C93.7 178 80 215.4 80 256v24.9c0 24.2-2.6 48.4-7.8 71.9C68.8 368.4 80.1 384 96.1 384c10.5 0 19.9-7 22.2-17.3c6.4-28.1 9.7-56.8 9.7-85.8V256c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM256 160c-53 0-96 43-96 96v24.9c0 35.9-4.6 71.5-13.8 106.1c-3.8 14.3 6.7 29 21.5 29c9.5 0 17.9-6.2 20.4-15.4c10.5-39 15.9-79.2 15.9-119.7V256c0-28.7 23.3-52 52-52s52 23.3 52 52v24.9c0 36.3-3.5 72.4-10.4 107.9c-2.7 13.9 7.7 27.2 21.8 27.2c10.2 0 19-7 21-17c7.7-38.8 11.6-78.3 11.6-118.1V256c0-53-43-96-96-96zm24 96c0-13.3-10.7-24-24-24s-24 10.7-24 24v24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9V256z" />
            </svg>
            <h3>Verify</h3>{" "}
          </div>
          <div className="icon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 448 512"
            >
              {" "}
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </div>
          <div className="icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 512 512"
            >
              <path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z" />
            </svg>
            <h3>Get Access</h3>
          </div>
        </div>
      </div>
      {/* bottom */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 VaultX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   const [loginClicked, setLoginClicked] = useState(false);

//   const handleLoginClick = () => {
//     // Set loginClicked to true when the login button is clicked
//     setLoginClicked(true);
//   };

//   return (
//     <div className="home-container">
//       <nav className="navbar">
//         <div className="logo-container">
//           {/* Replace the next line with your actual logo code */}
//           <img src="path/to/logo.png" alt="Logo" className="logo" />
//           <h2>VaultX</h2>
//         </div>
//         <div className="navbar-buttons">
//           <Link to="http://localhost:8000/login" onClick={handleLoginClick}>
//             <button>Login</button>
//           </Link>
//           <Link to="http://localhost:8000/registration">
//             <button>Register</button>
//           </Link>
//         </div>
//       </nav>

//       {/* New section with image and text */}
//       <div className="custom-section">
//         <img src="path/to/your-image.jpg" alt="image" />
//         <p>Some text about this section</p>
//       </div>

//       <div className="carousel-container">
//         <div className="logo-slogan">
//           {/* Replace the next line with your actual carousel logo code */}
//           <img
//             src="path/to/carousel-logo.png"
//             alt="Carousel Logo"
//             className="carousel-logo"
//           />
//           <p className="slogan">
//             <h2>
//               <b>Welcome to VaultX</b>
//             </h2>
//             <br /> Your Secure Platform for Managing and Sharing Files
//           </p>
//         </div>
//       </div>

//       <div className="services-container">
//         {/* Service 1 */}
//         <div className="service">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="40"
//             width="40"
//             viewBox="0 0 512 512"
//             fill="#FFC107"
//           >
//             {/* SVG Path for Service 1 */}
//           </svg>
//           <h3>Upload</h3>
//           <p>Upload your Files securely to the VaultX platform.</p>
//         </div>

//         {/* Service 2 */}
//         <div className="service">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="40"
//             width="40"
//             viewBox="0 0 512 512"
//             fill="#198745"
//           >
//             {/* SVG Path for Service 2 */}
//           </svg>
//           <h3>Retrieve</h3>
//           <p>Easily Retrieve your stored files whenever you need them.</p>
//         </div>

//         {/* Service 3 */}
//         <div className="service">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="40"
//             width="40"
//             viewBox="0 0 576 512"
//             fill="#DC3545"
//           >
//             {/* SVG Path for Service 3 */}
//           </svg>
//           <h3>Share</h3>
//           <p>Share files with others securely using VaultX sharing features.</p>
//         </div>
//       </div>

//       <div className="additional-container">
//         <h3>Additional Section</h3>

//         {/* Additional Icons */}
//         <div className="icon-container">
//           <div className="icon1">
//             {/* SVG for Additional Icon 1 */}
//           </div>

//           <div className="icon2">
//             {/* SVG for Additional Icon 2 */}
//           </div>

//           <div className="icon1">
//             {/* SVG for Additional Icon 3 */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
