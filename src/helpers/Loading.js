import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="row">
      <div className="col-6 mx-auto my-5">
        <h4><strong className="mt-5 my-5">Loading...</strong></h4>
        <ReactLoading className="mt-5 mx-auto" type={"spinningBubbles"} color={"#fffff"} height={'60%'} width={'10%'} />
        <h5 className="mt-5">Stuck? <p></p>Please refresh and try again!</h5>
      </div>
    </div>
  );

}


export default Loading;