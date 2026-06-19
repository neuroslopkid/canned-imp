import { PrimaryButton } from "@components/buttons/primary-button";
import { useState } from "react";

/**
 * State is the snapshot, hence there 0 0 (inside current snapshot)
 */
export const Ex1 = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log(count);

    setCount(count + 1);

    console.log(count);
  };

  return <PrimaryButton text={String(count)} onPress={handleClick} />;
};
