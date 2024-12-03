import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";

export type TestItem = {
  id: number;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  timeRemaining: string;
};

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
