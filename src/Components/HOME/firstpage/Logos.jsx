import React from "react";
import "./logos.css";

const logos = [
  "https://img.icons8.com/?size=100&id=5RKOijedhIGw&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=447&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=62856&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=19293&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=iFPHC1KfnoxC&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=h5EUmNCXhSH0&format=png&color=000000",
];

const Logos = () => {
  return (
    <div className="logosContainer">
      <div className="scrollWrapper">
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`logo-${index}`} className="logoImage" />
        ))}
        {/* duplicate logos for seamless scrolling */}
        {logos.map((logo, index) => (
          <img key={index + logos.length} src={logo} alt={`logo-${index}`} className="logoImage" />
        ))}
      </div>
    </div>
  );
};

export default Logos;
