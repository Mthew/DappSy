import React from "react";

import style from "./styles/coverphoto.module.css";

export const CoverPhoto = ({ photoSrc }) => {
  return (
    <>
      <span
        style={{ backgroundImage: `url(${photoSrc})` }}
        className={`${style["dappsy-cover-photo"]}`}
      ></span>
      <span className={`${style["dappsy-cover-overlay"]}`}></span>
    </>
  );
};
