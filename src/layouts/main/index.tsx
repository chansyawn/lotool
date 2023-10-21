"use client";

import { Provider } from "jotai";
import Header from "./Header";
import globalStore from "@/app/store";
import { ColorContextProvider } from "@/hooks/useColorMode";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={globalStore}>
      <ColorContextProvider>
        <Header />
        <div className="container isolate mx-auto px-3">{children}</div>
      </ColorContextProvider>
    </Provider>
  );
};

export default Main;
