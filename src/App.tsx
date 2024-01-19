import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aperiam
          doloribus eum quam ut ab ipsam fuga necessitatibus! Aspernatur numquam
          ducimus iusto dicta qui sunt consequatur quia eum delectus earum?
        </p>
      </div>
    </>
  );
}

export default App;
