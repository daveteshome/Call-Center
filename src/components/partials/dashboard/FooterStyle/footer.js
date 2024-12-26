import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg m-4 dark:bg-gray-800 m-2 p-3 flex  justify-center align-center text-center footer  ">
    
      <div >&copy; {new Date().getFullYear()} All rights reserved. Elilta Trading PLC. </div>
    </footer>
  );
};

export default Footer;
