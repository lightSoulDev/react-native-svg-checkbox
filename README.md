# react-native-svg-checkbox

Fully customizable animated SVG checkbox.

## Dependencies

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native SVG](https://github.com/react-native-svg/react-native-svg)

## Example

```tsx
<SvgCheckbox
    // [!] Required
    checkmarkColor="#2c2c2c"
    outlineColor="#2c2c2c"
    fillColor="#7850A8"
    // [?] Optional
    checked={false}
    checkmarkSvgParams={{ // Custom checkmark SVG
        path: "....", // SVG path
        viewBox: { // SCG ViewBox
            margin: {
                x: 10,
                y: 10,
            },
            x: 0,
            y: 0,
            width: 30,
            height: 30,
        },
    }}
    outlineStrokeParams={{
        width: 7,
        linejoin: "round",
        linecap: "round",
    }}
    checkmarkStrokeParams={{
        width: 1.4,
        linecap: "round",
        linejoin: "round",
    }}
    checkDuration={350} // check animation duration (ms)
    unCheckDuration={100} // uncheck animation duration (ms)

    fillSpeedMultiplier={3} // Fill animation speed multiplier
/>
```

## Custom SVG Demo
![Custom checkmark](./docs/custom.gif)

## Default SVG Demo
![Default checkmark](./docs/default.gif)
