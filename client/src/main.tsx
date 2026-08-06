import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker } from "./lib/sw-register";

// 註冊 Service Worker 支援 PWA
registerServiceWorker();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
