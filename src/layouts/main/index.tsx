"use client";

import { Provider } from "jotai";
import Header from "./Header";
import globalStore from "@/app/store";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <Header />
      <div className="container isolate mx-auto px-2">{children}</div>
    </Provider>
  );
}
