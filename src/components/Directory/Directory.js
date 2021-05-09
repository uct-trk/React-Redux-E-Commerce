import React from "react";
import menPhoto from "../../asserts/MEN.jpg";
import womenPhoto from "../../asserts/WOMEN.jpg";
import './directory.scss'

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${womenPhoto})` }}>
            <a href="">Women</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${menPhoto})` }}>
            <a href="">Men</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
