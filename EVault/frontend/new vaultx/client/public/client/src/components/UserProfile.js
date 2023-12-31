import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to manipulate the image URL by adding base URL and folder
  const manipulateImageUrl = (imageUrl, baseUrl, folder) => {
    return `${baseUrl}${folder}/${imageUrl.split('/').pop()}`;
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("http://localhost:8000/combined-detail");
        console.log("Response:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  return (
    <div className="App">
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData.user && (
        <div>
          <h2>User Information</h2>
          <p>Username: {userData.user.username || 'N/A'}</p>
          <p>First Name: {userData.user.first_name || 'N/A'}</p>
          <p>Last Name: {userData.user.last_name || 'N/A'}</p>
          {userData.more_info && (
            <>
              <h2>More Information</h2>
              <p>Phone: {userData.more_info.phone || 'N/A'}</p>
              <p>Address: {userData.more_info.address || 'N/A'}</p>
              <p>Date of Birth: {userData.more_info.dob || 'N/A'}</p>

              <h2>Photos</h2>
              {userData.more_info.photo && (
                <img src={manipulateImageUrl(userData.more_info.photo, 'http://localhost:8000', '/media/user_photos')} alt="User Photo" />
              )}
              {userData.more_info.aadhar_photo && (
                <img src={manipulateImageUrl(userData.more_info.aadhar_photo, 'http://localhost:8000', '/media/aadhar_photos')} alt="Aadhar Photo" />
              )}
              {/* Add more photo fields as needed */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;