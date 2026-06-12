import { PrimaryButton } from "@components/buttons/primary-button";
import { useState } from "react";

/**
 * Batching unifies all 3 renders in one render hence only +1 not +3.
 */
export const Ex2 = () => {
  const [count, setCount] = useState(0);

  const click = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Fix
    // setCount((prev) => prev + 1);
    // setCount((prev) => prev + 1);
    // setCount((prev) => prev + 1);
  };

  return <PrimaryButton text={String(count)} onPress={click} />;
};
