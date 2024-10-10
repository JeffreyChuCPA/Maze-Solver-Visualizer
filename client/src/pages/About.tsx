import { useContext } from "react";
import { PageContext } from "../PageProvider";
import "../styling/About.css";

const About = () => {
  const { currentPage } = useContext(PageContext);
  console.log(currentPage);

  return (
    <>
      <div className="about__page">
        <div className="about__card">
          <div className="about__text">
            <h1 className="about__title">Welcome!</h1>
            <p className="about__p">
              This is a coding project I made to help users visualize and
              understand the different types of maze solving and maze generating
              algorithms. The interactive platform was designed so that you can
              have full control over the maze size, colors of the maze elements,
              and execution speed to help learn how the different algorithms
              work in real time.
            </p>
            <p className="about__p">
              I also created a section where users can design their own{" "}
              <a href="/build-maze">custom mazes</a> and test how different
              algorithms perform on their creations. You can then submit your
              designs to this platform where other users can see and experience
              your maze in action. Browse through the{" "}
              <a href="/#collection">collection</a> of mazes made by fellow
              users and make sure to give them a like.{" "}
            </p>
            <p className="about__p">Be creative and maze it yourself!</p>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default About;
