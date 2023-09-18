import React from "react";
import "./Card.scss";

import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import defaultCover from "../../assets/default-cover.webp";


const Card = ({
  image="",
  title,
  subtitle='abc',
  subtitleLink = "abcd",
  subtitleMultiline = false,
  className='random',
  imageRounded = false,
  price='0'
  
}) => {
 
  return (
    <div className={"card-container " + className}>
      <img
        className="cover-img"
        src={image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultCover;
        }}
        alt="Cover"
        style={{ borderRadius: imageRounded ? "50%" : "" }}
      />

      <span className="title" title={title}>
        <span>{title}</span>
      </span>

      <div className={`subtitle-div ${subtitleMultiline ? "multiline" : ""}`}>
        <span className={`subtitle ${subtitleLink ? "subtitle-link" : ""}`}>
          {subtitle}
        </span>
       </div>
       
       <div className={`subtitle-div ${subtitleMultiline ? "multiline" : ""}`}>
        <span>
          ${price}ETH
        </span>
       </div>


     
    </div>
  );
};

export default Card;