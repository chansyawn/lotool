"use client";

import { Provider } from "jotai";
import globalStore from "../store";
import Header from "./Header";

export default function Framework({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <Header />
      <main className="container mx-auto px-2">{children}</main>
    </Provider>
  );
}
