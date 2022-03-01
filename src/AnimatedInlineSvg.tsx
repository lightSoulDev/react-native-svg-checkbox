import React, { useRef, useState } from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Path, PathProps } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedInlineSvgProps extends PathProps {
  progress: Animated.SharedValue<number>;
}

const AnimatedInlineSvg = ({
  progress,
  ...pathProps
}: AnimatedInlineSvgProps) => {
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);
  // https://github.com/software-mansion/react-native-reanimated/issues/2766
  // beizer func issue with Typescript
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: Math.max(0, length - length * progress.value),
  }));

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      // @ts-ignore
      onLayout={() => setLength(ref.current!.getTotalLength())}
      // @ts-ignore
      ref={ref}
      strokeDasharray={length}
      {...pathProps}
    />
  );
};

export default AnimatedInlineSvg;
