import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="row">
      <div className="col-6 mx-auto my-5">
        <ReactLoading className="mt-5 mx-auto" type={"spinningBubbles"} color={"#fffff"} height={'30%'} width={'20%'} />
        <p><strong className="mt-1 my-5">Loading...</strong></p>
        <p className="mt-5">If you're stuck, please refresh and try again! {":)"}</p>
      </div>
    </div>
  );

}


export default Loading;