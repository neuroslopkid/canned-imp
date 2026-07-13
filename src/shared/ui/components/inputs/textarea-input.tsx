import { TextInputProps } from "react-native";
import { Input } from "./input";

export const TextAreaInput = ({ numberOfLines = 5, ...props }: TextInputProps) => {
  return <Input multiline numberOfLines={numberOfLines} {...props} />;
};
