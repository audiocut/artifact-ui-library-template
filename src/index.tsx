import "./index.css";
import C1 from "./components/C1";
import C2 from "./components/C2";
import type { SessionState } from "./types/common";

const RootComponent = ({ sessionState }: { sessionState: SessionState }) => {
  
  const { componentName } = sessionState;

  if (componentName === "c1") {
    return <C1 />;
  }
  if (componentName === "c2") {
    return <C2 />;
  }
  return null;
};

export { RootComponent };
