import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateCase } from "./components/CreateCase";
import { Home } from "./components/Home";
import { Playground } from "./components/Playground";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases/create" element={<CreateCase />} />
        <Route path="/cases/:id/results" element={<ResultsPage />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}
