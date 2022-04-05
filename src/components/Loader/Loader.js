import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from 'react-loader-spinner';

function Loader() {
  return <Rings color="#3f51b5" height={100} width={100} />;
}

export default Loader;
