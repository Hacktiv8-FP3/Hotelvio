import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';

export const Reanimated2: React.FC = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value * 250 - 100 }],
  }));

  const moveObject = () => {
    offset.value = withSpring(Math.random());
  };

  return (
    <View padding-s1>
      <Animated.View style={[animatedStyles]}>
        <View center padding-s1>
          <Bounceable onPress={moveObject} activeScale={0.9}>
            <View center bg-primary padding-s8 br40>
              <Text _white>Bounceable</Text>
            </View>
          </Bounceable>
        </View>
      </Animated.View>
    </View>
  );
};
