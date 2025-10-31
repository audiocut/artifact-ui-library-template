import "./index.css";
import C1 from "./components/C1";
import C2 from "./components/C2";
import type { RootComponentProps } from "./types";

const RootComponent = ({ name }: RootComponentProps) => {
  if (name === "c1") {
    return <C1 />;
  }
  if (name === "c2") {
    return <C2 />;
  }
  return null;
};

export { RootComponent };
