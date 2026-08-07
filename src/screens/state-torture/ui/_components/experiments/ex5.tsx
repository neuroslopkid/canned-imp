import { useActionState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

// https://react.dev/reference/react/hooks

type LoginState = { status: string };
type LoginCredentials = { email: string; password: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const performLogin = (_prev: LoginState, _payload: LoginCredentials) => {
  const res = { ok: true };

  return res.ok ? { status: "success" } : { status: "error" };
};

const initialStatus = { status: "idle" };

export const Ex5 = () => {
  const [state, dispatchAction, isPending] = useActionState(performLogin, initialStatus);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePress1 = () => {
    dispatchAction({ email: "email", password: "password" });
  };

  return (
    <View style={{ flexDirection: "row", columnGap: 20 }}>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>123</Text>
        </View>
      )}
      {state.status === "error" && <Text>Error</Text>}
    </View>
  );
};
