# Blockchain eVault for Smart India Hackathon 2023

## Overview

This project is a secure eVault built for Smart India Hackathon 2023, designed exclusively for judges, clients, lawyers, and other stakeholders. The system ensures secure document management using blockchain, with user-friendly interfaces and robust functionalities.

## Technologies Used

- **Frontend:**
  - React.js for a modern and intuitive user interface.
  - Node.js for server-side rendering and efficient handling of requests.

- **Blockchain:**
  - Solidity for developing smart contracts on the Ethereum platform.
  - Metamask extension for seamless transaction handling.

- **Storage:**
  - Pinata IPFS for decentralized and secure document storage.

- **Backend:**
  - Django for backend development, providing a robust server.
  - MongoDB for efficient and scalable database management.

## Functionalities

1. **Upload:**
   - Users can securely upload documents to the eVault.

2. **Share:**
   - Share functionality enables easy and controlled document sharing among stakeholders.

3. **Retrieve:**
   - Retrieve option allows users to access their documents conveniently.

4. **Revoke:**
   - Users can revoke access to shared documents for enhanced control.

## Installation

1. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

2. **Blockchain:**
   - Install Metamask extension in your browser.
   - Deploy smart contracts using Solidity on the Ethereum platform.

3. **Storage:**
   - Set up a Pinata IPFS account and configure the API.

4. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py runserver
   ```

## Future Enhancements

- Implementing additional access control features.
- Integrating encryption for added document security.
- Enhancing scalability for accommodating a larger user base.

## Acknowledgments

Thanks to Smart India Hackathon 2023 for providing the opportunity to develop this innovative eVault solution. Special gratitude to the development team for their dedication and hard work.
