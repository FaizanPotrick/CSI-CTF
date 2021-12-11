import React from 'react';
import { useHistory } from "react-router-dom";
function Challenge1() {
  const history = useHistory();
  return (
    <div className="container">
      <button
        className="btn text-dark text-center m-4  p-0"
        onClick={() => {
          history.goBack();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
        <div>Title</div>
   <div>John is a Noogler and works as a security engineer. One of his colleagues sent him an image. He is now puzzled and couldn't understand what his colleague wants to say. Help John to uncover the secret message.</div>
   <a target={"_blank"} rel="noreferrer" href="https://drive.google.com/file/d/1T7RFHB1lakrrLV_vv1Dkh399ujEzuTAF/view?usp=sharing">Your Link</a>
    </div>
  );
}

export default Challenge1;
