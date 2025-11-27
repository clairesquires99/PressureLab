import { useState } from "react";
import { CreateCase } from "./components/CreateCase";
import { Home } from "./components/Home";
import { Playground } from "./components/Playground";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "create" | "results" | "playground"
  >("home");

  if (currentPage === "create") {
    return (
      <CreateCase
        onBack={() => setCurrentPage("home")}
        onSubmit={() => setCurrentPage("results")}
      />
    );
  }

  if (currentPage === "results") {
    return <ResultsPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "playground") {
    return <Playground />;
  }

  return <Home setCurrentPage={setCurrentPage} />;
}
