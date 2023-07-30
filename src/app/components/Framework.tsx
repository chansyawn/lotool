"use client";

import { Provider } from "jotai";
import globalStore from "../store";

export default function Framework({ children }: { children: React.ReactNode }) {
  return <Provider store={globalStore}>{children}</Provider>;
}
