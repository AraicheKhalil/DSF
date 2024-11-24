import React from "react";
import styles from "./loader.module.css";

const FileLoader = () => {
  return (
    <div className={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className={styles.scan}></div>
      <h1 className={styles.text}>File Scanning...</h1>
    </div>
  );
};

export default FileLoader;
