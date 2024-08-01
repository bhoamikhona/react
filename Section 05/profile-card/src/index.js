import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
      <Skill name="HTML" emoji="💪🏼" color="orangered" />
      <Skill name="CSS" emoji="💪🏼" color="blue" />
      <Skill name="JavaScript" emoji="💪🏼" color="yellow" />
      <Skill name="React" emoji="👶🏼" color="turquoise" />
    </ul>
  );
}

function Skill({ name, emoji, color }) {
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      {name} {emoji}
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
