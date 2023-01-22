import "./styles/global.css";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import "./lib/dayjs";
import { useState } from "react";

export function App() {
  const [update, setUpdate] = useState(false);

  function updateSummary() {
    setUpdate((prev) => !prev);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header updateSummary={updateSummary} />
        <SummaryTable update={update} />
      </div>
    </div>
  );
}
