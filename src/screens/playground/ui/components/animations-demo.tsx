import { View, Text, StyleSheet, Animated, useAnimatedValue, Pressable } from "react-native";
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

type AnimationsDemoProps = {
  useNativeDriver?: boolean;
};

export const AnimationsDemo = ({ useNativeDriver = true }: AnimationsDemoProps) => {
  const opacity = useAnimatedValue(0);
  const translateX = useAnimatedValue(0);

  const opacityRe = useSharedValue(0);
  const translateXRe = useSharedValue(0);

  const opacityAnimationStyle = useAnimatedStyle(() => ({
    opacity: opacityRe.value,
  }));

  const translateAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXRe.value }],
  }));

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver,
    }).start();
  };

  const fadeInRe = () => {
    opacityRe.value = withTiming(1, { duration: 800 });
  };

  const moveRight = () => {
    Animated.spring(translateX, {
      toValue: 200,
      useNativeDriver,
      friction: 10, // lower = more bouncy
      tension: 40, // higher = faster
    }).start();
  };

  const moveRightRe = () => {
    translateXRe.value = withSpring(150, { damping: 10, stiffness: 100 });
  };

  return (
    <View style={styles.container} testID="animation-demo" accessibilityLabel="animation-demo">
      <Text>Animations:</Text>

      <View
        style={{
          rowGap: 5,
        }}
      >
        <Pressable
          style={{
            height: 50,
            padding: 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "grey",
            borderRadius: 10,
          }}
          onPress={fadeIn}
          testID="animated-fade-in-trigger"
          accessibilityLabel="animated-fade-in-trigger"
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Fade In
          </Text>
        </Pressable>
        <Animated.View
          style={{
            opacity,
            minWidth: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "black",
            padding: 40,
          }}
          testID="animated-view-fade-in"
          accessibilityLabel="animated-view-fade-in"
        ></Animated.View>
      </View>

      <View
        style={{
          rowGap: 5,
        }}
      >
        <Pressable
          style={{
            height: 50,
            padding: 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "grey",
            borderRadius: 10,
          }}
          onPress={fadeInRe}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Fade In Re
          </Text>
        </Pressable>
        <Reanimated.View
          style={[
            {
              minWidth: "100%",
              height: 50,
              borderWidth: 1,
              borderColor: "black",
              padding: 40,
            },
            opacityAnimationStyle,
          ]}
        ></Reanimated.View>
      </View>

      <View
        style={{
          rowGap: 5,
        }}
      >
        <Pressable
          style={{
            height: 50,
            padding: 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "grey",
            borderRadius: 10,
          }}
          onPress={moveRight}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Move
          </Text>
        </Pressable>
        <View
          style={{
            minWidth: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "black",
            padding: 40,
          }}
        >
          <Animated.View
            style={{ borderWidth: 1, borderColor: "black", width: 30, height: 30, transform: [{ translateX }] }}
          ></Animated.View>
        </View>
      </View>

      <View
        style={{
          rowGap: 5,
        }}
      >
        <Pressable
          style={{
            height: 50,
            padding: 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "grey",
            borderRadius: 10,
          }}
          onPress={moveRightRe}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Move Re
          </Text>
        </Pressable>
        <View
          style={{
            minWidth: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "black",
            padding: 40,
          }}
        >
          <Reanimated.View
            style={[{ borderWidth: 1, borderColor: "black", width: 30, height: 30 }, translateAnimationStyle]}
          ></Reanimated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    padding: 20,
    rowGap: 10,
  },
});
