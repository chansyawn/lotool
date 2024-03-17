"use client";

import { type PortalProps } from "@radix-ui/react-portal";
import { type ReactElement, createContext, useContext } from "react";

type PortalContainer = PortalProps["container"];

const PortalContainerContext = createContext<PortalContainer>(undefined);

export const usePortalContainer = (): PortalContainer => {
  const container = useContext(PortalContainerContext);
  return container;
};

interface PortalContainerProviderProps {
  container?: HTMLElement;
  children: React.ReactNode;
}

export function PortalContainerProvider({
  container = document.body,
  children,
}: PortalContainerProviderProps): ReactElement {
  return (
    <PortalContainerContext.Provider value={container}>
      {children}
    </PortalContainerContext.Provider>
  );
}

export function withPortalProvider<
  Props extends { container?: PortalContainer },
>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
  function ComponentWithPortalProvider(props: Props) {
    const container = usePortalContainer();
    return <WrappedComponent container={container} {...props} />;
  }

  return ComponentWithPortalProvider;
}
