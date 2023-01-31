import React from "react";
import { useEffect } from "react";

const ForceRoomEnd = ({ theEnd, setTheEnd }) => {
  useEffect(() => {
    setTheEnd(false);
  }, []);

  return <div></div>;
};

export default ForceRoomEnd;
