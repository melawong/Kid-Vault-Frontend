import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="row">
      <div className="col-6 mx-auto my-auto">
        <ReactLoading className="mt-5 mx-auto" type={"spinningBubbles"} color={"#fffff"} height={'40%'} width={'40%'} />
        <p><strong className="mt-5">Loading...</strong></p>
        <p className="mt-5">If you're stuck in this state, please refresh and try again! {":)"}</p>
      </div>
    </div>
  );

}


export default Loading;