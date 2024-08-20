import { useContext } from "react";
import { PageContext } from "../PageProvider";
import "../styling/About.css";

const About = () => {
  const { currentPage } = useContext(PageContext);
  console.log(currentPage);

  return <div className="about__card">Work in Progress!</div>;
};

export default About;
