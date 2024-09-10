import React from "react";
import StarRating from "./components/StarRating.jsx";
import Test from "./components/Test.jsx";

function App() {
  return (
    <div>
      <StarRating
        maxRating={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <StarRating
        maxRating={5}
        size={25}
        color="red"
        classname="test"
        defaultRating={3}
      />

      <Test />
    </div>
  );
}

export default App;
