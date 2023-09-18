import React from "react";
import "./SectionHeader.scss";
import {
    Link,
  } from "react-router-dom";
const SectionHeader = ({ type = "text", title = "Empty title", linkTo = "#" }) => {
  return (
    <section className="section-container">
      <div className="section-header">
        <h2 className="title">
          {type === "text" ? title : null}
          {type === "link" ? (
            <a
              href={linkTo}
              onClick={(e) => e.preventDefault()}
              className="title-link"
            >
              {title}
            </a>
          ) : null}
        </h2>

        {type === "link" ? (
          <Link
            to={linkTo}
            
            className="aside-link"
          >
            SEE ALL
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default SectionHeader;