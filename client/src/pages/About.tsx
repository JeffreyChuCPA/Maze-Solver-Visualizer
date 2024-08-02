import React, { useContext } from "react";
import { PageContext } from "../PageProvider";

const About = () => {
  const {currentPage} = useContext(PageContext)
  console.log(currentPage);
  
  return <div>About</div>;
};

export default About;
