"use client";

import { Provider } from "jotai";
import Header from "./Header";
import globalStore from "@/app/store";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={globalStore}>
      <Header />
      <div className="container isolate mx-auto px-3">{children}</div>
    </Provider>
  );
};

export default Main;
