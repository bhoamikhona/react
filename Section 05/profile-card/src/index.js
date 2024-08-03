import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skills = [
  {
    skill: "HTML",
    level: "advanced",
    color: "#DD4B25",
  },
  {
    skill: "CSS",
    level: "advanced",
    color: "#254ADD",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "React",
    level: "intermediate",
    color: "#05D7FB",
  },
  {
    skill: "Node.js",
    level: "beginner",
    color: "#52A041",
  },
];
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="images/headshot.jpg"
      alt="Bhoami K Khona Headshot"
    />
  );
}

function Intro() {
  return (
    <div>
      <h1>Bhoami K Khona</h1>
      <p>
        I am a highly motivated software engineer who enjoys learning about new
        technologies.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill
          key={skill.skill}
          skill={skill.skill}
          level={skill.level}
          color={skill.color}
        />
      ))}
    </ul>
  );
}

function Skill({ skill, level, color }) {
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶🏼"}
        {level === "intermediate" && "👍🏼"}
        {level === "advanced" && "💪🏼"}
      </span>
    </li>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
