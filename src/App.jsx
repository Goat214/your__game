import { Routes, Route } from "react-router-dom";
import Easy from "./page/one_q";
import Medium from "./page/two_q";
import Hard from "./page/three_q";
import Expert from "./page/four_q";
import Home from "./page/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/easy" element={<Easy />} />
      <Route path="/medium" element={<Medium />} />
      <Route path="/hard" element={<Hard />} />
      <Route path="/expert" element={<Expert />} />
    </Routes>
  );
}

export default App;
