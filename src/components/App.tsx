import { Routes, Route } from "react-router-dom";

import 'src/styles/App.scss';
import Home from "./Home";
import PostDetail from "./PostDetail";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
}
