/* 
------------------------------------------------------------------------------
 File: Footer.js
 Purpose: This file contains the Footer React component, which is responsible for
 rendering the footer section in the TravelEase web application.
 Author: IT20122096
 Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <p style={styles.text}>© {new Date().getFullYear()} TravelEase</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    bottom: "0",
    width: "100%",
  },
  text: {
    fontSize: "14px",
  },
};

export default Footer;
