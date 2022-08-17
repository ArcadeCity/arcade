// src/atoms/text/text.tsx
import { flatten } from "ramda";
import { Text as ReactNativeText } from "react-native";

// src/theme/palette.ts
var palette = {
  arwes: "rgb(0, 248, 248)",
  arwesTitle: "#a1ecfb",
  arwesText: "#26dafd",
  arwesFade: "rgba(0, 248, 248, 0.5)",
  arwesFader: "rgba(0, 248, 248, 0.3)",
  arwesSecondary: "rgb(6,61,62)",
  white: "#FFFFFF",
  black: "#000000",
  haiti: "#120B29",
  purple: "#1C133A",
  portGore: "#2D2252",
  blueBell: "#9D98CB",
  blueBellFaded: "rgba(157, 152, 203, 0.6)",
  minsk: "#46367C",
  moonRaker: "#EEECFB",
  radicalRed: "#FC3A57",
  pinkFlamingo: "#F459F4",
  electricViolet: "#AE30FF",
  electricIndigo: "#5B20F2",
  blueBright: "#66B3F8"
};

// src/theme/color.ts
var ACTIVE_OPACITY = 0.8;
var color = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  background: palette.haiti,
  primary: palette.electricIndigo,
  secondary: palette.moonRaker,
  info: palette.portGore,
  line: palette.portGore,
  field: palette.portGore,
  tabbar: palette.portGore,
  text: palette.moonRaker,
  secondaryText: palette.minsk,
  dim: palette.blueBell,
  origin: palette.electricViolet,
  link: palette.electricViolet,
  active: palette.electricViolet,
  destination: palette.pinkFlamingo,
  highlight: palette.pinkFlamingo,
  error: palette.radicalRed,
  shadow: palette.haiti
};

// src/theme/spacing.ts
var spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64];

// src/theme/typography.ts
import { Platform } from "react-native";
var typography = {
  primary: Platform.select({
    ios: "Inter_400Regular",
    android: "Inter_400Regular",
    web: "Inter"
  }),
  bold: Platform.select({ ios: "Inter_700Bold", android: "Inter_700Bold", web: "Inter_700Bold" }),
  secondary: Platform.select({
    ios: "Lexend_700Bold",
    android: "Lexend_700Bold",
    web: "Lexend_700Bold"
  }),
  code: Platform.select({ ios: "Courier", android: "monospace", web: "monospace" })
};

// src/atoms/text/text.presets.ts
var BASE = {
  fontFamily: typography.primary,
  color: color.palette.moonRaker,
  fontSize: 15,
  lineHeight: 22
};
var SECONDARY = {
  ...BASE,
  color: color.palette.blueBell
};
var presets = {
  default: BASE,
  bold: { ...BASE, fontFamily: typography.bold },
  superBold: { ...BASE, fontFamily: typography.bold },
  header: { ...BASE, fontFamily: typography.bold, lineHeight: 16 },
  title: {
    ...BASE,
    fontSize: 28,
    lineHeight: 34,
    marginVertical: spacing[2],
    fontFamily: typography.secondary
  },
  title2: {
    ...BASE,
    fontSize: 22,
    lineHeight: 28,
    marginVertical: spacing[2]
  },
  title3: {
    ...BASE,
    fontSize: 24,
    lineHeight: 28,
    marginVertical: spacing[2],
    fontFamily: typography.bold
  },
  description: { ...SECONDARY, marginBottom: spacing[5] - 2 },
  descriptionSlim: { ...SECONDARY },
  label: { ...BASE, fontFamily: typography.secondary },
  labelCancel: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.error
  },
  labelAccept: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.primary
  },
  secondaryLabel: {
    color: color.secondaryText,
    fontSize: 16,
    lineHeight: 30
  },
  sectionHeader: {
    ...SECONDARY,
    fontSize: 13,
    lineHeight: 14,
    fontFamily: typography.bold,
    letterSpacing: 1,
    marginBottom: spacing[2]
  },
  error: {
    ...BASE,
    fontSize: 12,
    lineHeight: 14,
    color: color.error,
    marginTop: spacing[2]
  },
  link: {
    ...BASE,
    color: color.link,
    fontFamily: typography.bold
  },
  small: {
    ...SECONDARY,
    fontSize: 11,
    lineHeight: 14,
    color: color.palette.moonRaker
  },
  detail: {
    ...BASE,
    fontSize: 9,
    lineHeight: 11,
    fontFamily: typography.bold
  }
};

// src/atoms/text/text.tsx
var Text = (props) => {
  const {
    preset = "default",
    capitalize: capitalized = false,
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const whichText = text || "";
  const newText = capitalized ? capitalize(whichText) : whichText;
  const content = newText || children;
  const style = presets[preset] || presets.default;
  const styles5 = flatten([style, styleOverride]);
  return <ReactNativeText key={tx} {...rest} style={styles5}>{content}</ReactNativeText>;
};
function capitalize(theString) {
  return theString.charAt(0).toUpperCase() + theString.slice(1);
}

// src/library/ChannelPreviewScreen.tsx
import { H1, View as View2 } from "dripsy";

// src/molecules/ChannelPreview.tsx
import { Text as Text2 } from "dripsy";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
var ChannelPreview = ({ channel, onPress }) => {
  var _a;
  const picture = (channel == null ? void 0 : channel.picture) && ((_a = channel == null ? void 0 : channel.picture) == null ? void 0 : _a.length) > 4 ? channel.picture : "http://placekitten.com/200/200";
  return <TouchableOpacity activeOpacity={0.8} key={(channel == null ? void 0 : channel.id) ?? "asdf"} onPress={onPress} style={styles.container}>
    <Image source={{ uri: picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
    <View style={styles.contentContainer}>
      <Text2 style={styles.channelName}>{(channel == null ? void 0 : channel.name) ?? "no name"}</Text2>
      <Text2 style={styles.channelPreview}>{(channel == null ? void 0 : channel.about) ?? "no about"}</Text2>
    </View>
  </TouchableOpacity>;
};
var styles = StyleSheet.create({
  channelName: {
    color: palette.moonRaker,
    textAlign: "left",
    paddingHorizontal: spacing[2],
    paddingTop: 1
  },
  channelPreview: {
    color: palette.blueBell,
    textAlign: "left",
    fontSize: 12,
    paddingHorizontal: spacing[2],
    paddingTop: 4
  },
  container: {
    backgroundColor: palette.purple,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    flexDirection: "row",
    padding: spacing[3]
  },
  contentContainer: { flex: 1 },
  row: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row"
  },
  title: { fontSize: 14, fontWeight: "700" }
});

// src/library/ChannelPreviewScreen.tsx
function ChannelPreviewScreen() {
  const dummyChannel = {
    id: "1",
    name: "Dummy Channel",
    about: "This is a dummy channel",
    picture: "http://placekitten.com/200/300",
    type: "public",
    pubkey: "abcdef",
    created_at: Date.now(),
    kind: 40,
    tags: [],
    content: "",
    sig: "asdf"
  };
  return <View2 sx={{
    alignItems: "center",
    backgroundColor: color.background,
    paddingTop: 40
  }}>
    <H1>ChannelPreview</H1>
    <View2 style={{ height: 20 }} />
    <ChannelPreview channel={dummyChannel} onPress={() => console.log("Pressed ChannelPreview")} />
    <View2 style={{ height: 30 }} />
  </View2>;
}

// ../../node_modules/ui/src/theme/palette.ts
var palette2 = {
  arwes: "rgb(0, 248, 248)",
  arwesTitle: "#a1ecfb",
  arwesText: "#26dafd",
  arwesFade: "rgba(0, 248, 248, 0.5)",
  arwesFader: "rgba(0, 248, 248, 0.3)",
  arwesSecondary: "rgb(6,61,62)",
  white: "#FFFFFF",
  black: "#000000",
  haiti: "#120B29",
  purple: "#1C133A",
  portGore: "#2D2252",
  blueBell: "#9D98CB",
  blueBellFaded: "rgba(157, 152, 203, 0.6)",
  minsk: "#46367C",
  moonRaker: "#EEECFB",
  radicalRed: "#FC3A57",
  pinkFlamingo: "#F459F4",
  electricViolet: "#AE30FF",
  electricIndigo: "#5B20F2",
  blueBright: "#66B3F8"
};

// ../../node_modules/ui/src/theme/color.ts
var color2 = {
  palette: palette2,
  transparent: "rgba(0, 0, 0, 0)",
  background: palette2.haiti,
  primary: palette2.electricIndigo,
  secondary: palette2.moonRaker,
  info: palette2.portGore,
  line: palette2.portGore,
  field: palette2.portGore,
  tabbar: palette2.portGore,
  text: palette2.moonRaker,
  secondaryText: palette2.minsk,
  dim: palette2.blueBell,
  origin: palette2.electricViolet,
  link: palette2.electricViolet,
  active: palette2.electricViolet,
  destination: palette2.pinkFlamingo,
  highlight: palette2.pinkFlamingo,
  error: palette2.radicalRed,
  shadow: palette2.haiti
};

// ../../node_modules/ui/src/theme/typography.ts
import { Platform as Platform2 } from "react-native";
var typography2 = {
  primary: Platform2.select({
    ios: "Inter_400Regular",
    android: "Inter_400Regular",
    web: "Inter"
  }),
  bold: Platform2.select({ ios: "Inter_700Bold", android: "Inter_700Bold", web: "Inter_700Bold" }),
  secondary: Platform2.select({
    ios: "Lexend_700Bold",
    android: "Lexend_700Bold",
    web: "Lexend_700Bold"
  }),
  code: Platform2.select({ ios: "Courier", android: "monospace", web: "monospace" })
};

// src/molecules/map/map.tsx
import { WebView } from "react-native-webview";
var Map = () => {
  return <WebView style={{ backgroundColor: palette2.haiti, flex: 1 }} source={{ uri: "https://map-demo.arcade.city" }} />;
};

// ../../node_modules/moti/build/core/motify.js
import React, { forwardRef } from "react";
import Animated from "react-native-reanimated";

// ../../node_modules/framer-motion/dist/es/context/PresenceContext.mjs
import { createContext } from "react";
var PresenceContext = createContext(null);

// ../../node_modules/framer-motion/dist/es/utils/use-constant.mjs
import { useRef } from "react";
function useConstant(init) {
  var ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
import { useContext, useEffect } from "react";

// ../../node_modules/framer-motion/dist/es/utils/use-id.mjs
var counter = 0;
var incrementId = function() {
  return counter++;
};
var useId = function() {
  return useConstant(incrementId);
};

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
function usePresence() {
  var context = useContext(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id = useId();
  useEffect(function() {
    return register(id);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// ../../node_modules/moti/build/core/use-motify.js
import { useCallback, useContext as useContext2, useEffect as useEffect2 } from "react";
import { useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming, withDelay, withRepeat, withSequence, runOnJS } from "react-native-reanimated";

// ../../node_modules/moti/build/core/constants/package-name.js
var PackageName = "moti";

// ../../node_modules/moti/build/core/use-motify.js
var debug = (...args) => {
  "worklet";
  if (!global.shouldDebugMoti) {
    return;
  }
  if (args) {
  }
  console.log("[moti]", ...args);
};
var isColor = (styleKey) => {
  "worklet";
  const keys = {
    backgroundColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    borderRightColor: true,
    borderTopColor: true,
    color: true,
    shadowColor: true,
    borderColor: true,
    borderEndColor: true,
    borderStartColor: true
  };
  return Boolean(keys[styleKey]);
};
var isTransform = (styleKey) => {
  "worklet";
  const transforms = {
    perspective: true,
    rotate: true,
    rotateX: true,
    rotateY: true,
    rotateZ: true,
    scale: true,
    scaleX: true,
    scaleY: true,
    translateX: true,
    translateY: true,
    skewX: true,
    skewY: true
  };
  return Boolean(transforms[styleKey]);
};
function animationDelay(_key, transition, defaultDelay) {
  var _a, _b;
  "worklet";
  const key = _key;
  let delayMs = defaultDelay;
  if (((_a = transition == null ? void 0 : transition[key]) == null ? void 0 : _a.delay) != null) {
    delayMs = (_b = transition == null ? void 0 : transition[key]) == null ? void 0 : _b.delay;
  } else if ((transition == null ? void 0 : transition.delay) != null) {
    delayMs = transition.delay;
  }
  return {
    delayMs
  };
}
function animationConfig(styleProp, transition) {
  var _a, _b, _c, _d;
  "worklet";
  const key = styleProp;
  let repeatCount = 0;
  let repeatReverse = true;
  let animationType = "spring";
  if (isColor(key) || key === "opacity")
    animationType = "timing";
  const styleSpecificTransition = transition == null ? void 0 : transition[key];
  if (styleSpecificTransition == null ? void 0 : styleSpecificTransition.type) {
    animationType = styleSpecificTransition.type;
  } else if (transition == null ? void 0 : transition.type) {
    animationType = transition.type;
  }
  const loop = (styleSpecificTransition == null ? void 0 : styleSpecificTransition.loop) ?? (transition == null ? void 0 : transition.loop);
  if (loop != null) {
    repeatCount = loop ? -1 : 0;
  }
  if ((styleSpecificTransition == null ? void 0 : styleSpecificTransition.repeat) != null) {
    repeatCount = styleSpecificTransition == null ? void 0 : styleSpecificTransition.repeat;
  } else if ((transition == null ? void 0 : transition.repeat) != null) {
    repeatCount = transition.repeat;
  }
  if ((styleSpecificTransition == null ? void 0 : styleSpecificTransition.repeatReverse) != null) {
    repeatReverse = styleSpecificTransition.repeatReverse;
  } else if ((transition == null ? void 0 : transition.repeatReverse) != null) {
    repeatReverse = transition.repeatReverse;
  }
  let config = {};
  let animation = (...props) => props;
  if (animationType === "timing") {
    const duration = ((_a = transition == null ? void 0 : transition[key]) == null ? void 0 : _a.duration) ?? (transition == null ? void 0 : transition.duration);
    const easing = ((_b = transition == null ? void 0 : transition[key]) == null ? void 0 : _b.easing) ?? (transition == null ? void 0 : transition.easing);
    if (easing) {
      config["easing"] = easing;
    }
    if (duration != null) {
      config["duration"] = duration;
    }
    animation = withTiming;
  } else if (animationType === "spring") {
    animation = withSpring;
    config = {};
    const configKeys = [
      "damping",
      "mass",
      "overshootClamping",
      "restDisplacementThreshold",
      "restSpeedThreshold",
      "stiffness",
      "velocity"
    ];
    for (const configKey of configKeys) {
      const styleSpecificConfig = (_c = transition == null ? void 0 : transition[key]) == null ? void 0 : _c[configKey];
      const transitionConfigForKey = transition == null ? void 0 : transition[configKey];
      if (styleSpecificConfig != null) {
        config[configKey] = styleSpecificConfig;
      } else if (transitionConfigForKey != null) {
        config[configKey] = transitionConfigForKey;
      }
    }
  } else if (animationType === "decay") {
    animation = withDecay;
    config = {
      velocity: 2,
      deceleration: 2
    };
    const configKeys = [
      "clamp",
      "velocity",
      "deceleration",
      "velocityFactor"
    ];
    for (const configKey of configKeys) {
      const styleSpecificConfig = (_d = transition == null ? void 0 : transition[key]) == null ? void 0 : _d[configKey];
      const transitionConfigForKey = transition == null ? void 0 : transition[configKey];
      if (styleSpecificConfig != null) {
        config[configKey] = styleSpecificConfig;
      } else if (transitionConfigForKey != null) {
        config[configKey] = transitionConfigForKey;
      }
    }
  }
  return {
    animation,
    config,
    repeatReverse,
    repeatCount,
    shouldRepeat: !!repeatCount
  };
}
function useMotify({ animate: animateProp, from: fromProp = false, transition: transitionProp, exitTransition: exitTransitionProp, delay: defaultDelay, state, stylePriority = "animate", onDidAnimate, exit: exitProp, animateInitialState = false }) {
  const isMounted = useSharedValue(false);
  const [isPresent, safeToUnmount] = usePresence();
  const presence = useContext2(PresenceContext);
  const disableInitialAnimation = (presence == null ? void 0 : presence.initial) === false && !animateInitialState;
  const custom = useCallback(() => {
    "worklet";
    return presence == null ? void 0 : presence.custom;
  }, [presence]);
  const reanimatedSafeToUnmount = useCallback(() => {
    safeToUnmount == null ? void 0 : safeToUnmount();
  }, [safeToUnmount]);
  const reanimatedOnDidAnimated = useCallback((...args) => {
    onDidAnimate == null ? void 0 : onDidAnimate(...args);
  }, [onDidAnimate]);
  const hasExitStyle = Boolean(typeof exitProp === "function" || typeof exitProp === "object" && exitProp && Object.keys(exitProp).length > 0);
  const style = useAnimatedStyle(() => {
    var _a, _b, _c, _d, _e, _f;
    const final = {
      transform: []
    };
    const variantStyle = ((_a = state == null ? void 0 : state.__state) == null ? void 0 : _a.value) || {};
    let animateStyle;
    if (typeof animateProp == "function") {
      animateStyle = animateProp() || {};
    } else if (animateProp && "value" in animateProp) {
      animateStyle = animateProp.value || {};
    } else {
      animateStyle = animateProp || {};
    }
    debug("style", animateStyle);
    const initialStyle = fromProp || {};
    let exitStyle = exitProp || {};
    if (typeof exitStyle === "function") {
      exitStyle = exitStyle(custom());
    }
    const isExiting = !isPresent && hasExitStyle;
    let mergedStyles = {};
    if (stylePriority === "state") {
      mergedStyles = Object.assign({}, animateStyle, variantStyle);
    } else {
      mergedStyles = Object.assign({}, variantStyle, animateStyle);
    }
    if (!isMounted.value && !disableInitialAnimation && Object.keys(initialStyle).length) {
      mergedStyles = initialStyle;
    } else {
      mergedStyles = Object.assign({}, initialStyle, mergedStyles);
    }
    if (isExiting && exitStyle) {
      mergedStyles = Object.assign({}, exitStyle);
    }
    const exitingStyleProps = {};
    for (const key in exitStyle || {}) {
      const disabledExitStyles = {
        position: true
      };
      if (!disabledExitStyles[key]) {
        exitingStyleProps[key] = true;
      }
    }
    let transition;
    if (transitionProp && "value" in transitionProp) {
      transition = transitionProp.value;
    } else {
      transition = transitionProp;
    }
    if (isExiting && exitTransitionProp) {
      let exitTransition;
      if (exitTransitionProp && "value" in exitTransitionProp) {
        exitTransition = exitTransitionProp.value;
      } else if (typeof exitTransitionProp == "function") {
        exitTransition = exitTransitionProp(custom());
      } else {
        exitTransition = exitTransitionProp;
      }
      transition = Object.assign({}, transition, exitTransition);
    }
    for (const _key in mergedStyles) {
      const key = _key;
      const value = mergedStyles[key];
      const { animation, config, shouldRepeat, repeatCount, repeatReverse } = animationConfig(key, transition);
      const callback = (completed, recentValue) => {
        if (onDidAnimate) {
          runOnJS(reanimatedOnDidAnimated)(
            key,
            completed,
            recentValue,
            {
              attemptedValue: value
            }
          );
        }
        if (isExiting) {
          exitingStyleProps[key] = false;
          const areStylesExiting = Object.values(exitingStyleProps).some(Boolean);
          if (!areStylesExiting) {
            runOnJS(reanimatedSafeToUnmount)();
          }
        }
      };
      let { delayMs } = animationDelay(key, transition, defaultDelay);
      if (value == null || value === false) {
        continue;
      }
      const getSequenceArray = (sequenceKey, sequenceArray) => {
        const sequence = [];
        for (const step of sequenceArray) {
          const shouldPush = typeof step === "object" ? step && (step == null ? void 0 : step.value) != null && (step == null ? void 0 : step.value) !== false : step != null && step !== false;
          if (shouldPush) {
            let stepDelay = delayMs;
            let stepValue = step;
            let stepConfig = Object.assign({}, config);
            let stepAnimation = animation;
            if (typeof step === "object") {
              const stepTransition = Object.assign({}, step);
              delete stepTransition.delay;
              delete stepTransition.value;
              const { config: inlineStepConfig, animation: animation2 } = animationConfig(sequenceKey, stepTransition);
              stepConfig = Object.assign({}, stepConfig, inlineStepConfig);
              stepAnimation = animation2;
              if (step.delay != null) {
                stepDelay = step.delay;
              }
              stepValue = step.value;
            }
            const sequenceValue = stepAnimation(stepValue, stepConfig, callback);
            if (stepDelay != null) {
              sequence.push(withDelay(stepDelay, sequenceValue));
            } else {
              sequence.push(sequenceValue);
            }
          }
        }
        return sequence;
      };
      if (key === "transform") {
        if (!Array.isArray(value)) {
          console.error(`[${PackageName}]: Invalid transform value. Needs to be an array.`);
        } else {
          for (const transformObject of value) {
            final["transform"] = final["transform"] || [];
            const transformKey = Object.keys(transformObject)[0];
            const transformValue = transformObject[transformKey];
            const transform = {};
            if (Array.isArray(transformValue)) {
              const sequence = getSequenceArray(transformKey, transformValue);
              if (sequence.length) {
                let finalValue = withSequence(sequence[0], ...sequence.slice(1));
                if (shouldRepeat) {
                  finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
                }
                transform[transformKey] = finalValue;
              }
            } else {
              if (((_b = transition == null ? void 0 : transition[transformKey]) == null ? void 0 : _b.delay) != null) {
                delayMs = (_c = transition == null ? void 0 : transition[transformKey]) == null ? void 0 : _c.delay;
              }
              let finalValue = animation(transformValue, config, callback);
              if (shouldRepeat) {
                finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
              }
              if (delayMs != null) {
                transform[transformKey] = withDelay(delayMs, finalValue);
              } else {
                transform[transformKey] = finalValue;
              }
            }
            if (Object.keys(transform).length) {
              final["transform"].push(transform);
            }
          }
        }
      } else if (Array.isArray(value)) {
        const sequence = getSequenceArray(key, value);
        let finalValue = withSequence(sequence[0], ...sequence.slice(1));
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }
        if (isTransform(key)) {
          final["transform"] = final["transform"] || [];
          if (sequence.length) {
            const transform = {};
            transform[key] = finalValue;
            final["transform"].push(transform);
          }
        } else {
          if (sequence.length) {
            final[key] = finalValue;
          }
        }
      } else if (isTransform(key)) {
        final["transform"] = final["transform"] || [];
        if (((_d = transition == null ? void 0 : transition[key]) == null ? void 0 : _d.delay) != null) {
          delayMs = (_e = transition == null ? void 0 : transition[key]) == null ? void 0 : _e.delay;
        }
        const transform = {};
        let finalValue = animation(value, config, callback);
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }
        if (delayMs != null) {
          transform[key] = withDelay(delayMs, finalValue);
        } else {
          transform[key] = finalValue;
        }
        final["transform"].push(transform);
      } else if (typeof value === "object") {
        final[key] = {};
        for (const innerStyleKey in value || {}) {
          let finalValue = animation(value, config, callback);
          if (shouldRepeat) {
            finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
          }
          if (delayMs != null) {
            final[key][innerStyleKey] = withDelay(delayMs, finalValue);
          } else {
            final[key][innerStyleKey] = finalValue;
          }
        }
      } else {
        let finalValue = animation(value, config, callback);
        if (shouldRepeat) {
          finalValue = withRepeat(finalValue, repeatCount, repeatReverse);
        }
        if (delayMs != null && typeof delayMs === "number") {
          final[key] = withDelay(delayMs, finalValue);
        } else {
          final[key] = finalValue;
        }
      }
    }
    if (!((_f = final.transform) == null ? void 0 : _f.length)) {
      delete final.transform;
    }
    return final;
  }, [
    animateProp,
    custom,
    defaultDelay,
    disableInitialAnimation,
    exitProp,
    exitTransitionProp,
    fromProp,
    hasExitStyle,
    isMounted,
    isPresent,
    onDidAnimate,
    reanimatedOnDidAnimated,
    reanimatedSafeToUnmount,
    state,
    stylePriority,
    transitionProp
  ]);
  useEffect2(() => {
    isMounted.value = true;
  }, [isMounted]);
  useEffect2(function allowUnMountIfMissingExit() {
    if (!isPresent && !hasExitStyle) {
      reanimatedSafeToUnmount();
    }
  }, [hasExitStyle, isPresent, reanimatedSafeToUnmount]);
  return {
    style
  };
}

// ../../node_modules/moti/build/core/motify.js
var { createAnimatedComponent } = Animated;
function motify(ComponentWithoutAnimation) {
  const Component = createAnimatedComponent(ComponentWithoutAnimation);
  const withAnimations = () => {
    const Motified = forwardRef(function Moti({ animate, style, from, transition, delay, state, stylePriority, onDidAnimate, exit, animateInitialState, exitTransition, ...props }, ref) {
      const animated = useMotify({
        animate,
        from,
        transition,
        delay,
        state,
        stylePriority,
        onDidAnimate,
        exit,
        exitTransition,
        animateInitialState
      });
      return React.createElement(Component, Object.assign({}, props, { style: style ? [style, animated.style] : animated.style, ref }));
    });
    Motified.displayName = `Moti.${ComponentWithoutAnimation.displayName || ComponentWithoutAnimation.name || "NoName"}`;
    return Motified;
  };
  return withAnimations;
}

// ../../node_modules/moti/build/components/view.js
import { View as RView } from "react-native";
var View3 = motify(RView)();

// src/molecules/map/FadeInMap.tsx
var FadeInMap = () => {
  return <>
    <View3 delay={2500} transition={{
      type: "timing",
      duration: 2500
    }} style={{
      flex: 1,
      backgroundColor: palette2.haiti,
      position: "absolute",
      zIndex: 7888,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }} from={{
      opacity: 1
    }} animate={{
      opacity: 0.2
    }} />
    <Map />
  </>;
};

// src/molecules/message/message.tsx
import { Image as Image2, View as View4 } from "react-native";
import moment from "moment";

// src/molecules/message/message.presets.ts
import { Platform as Platform3 } from "react-native";
var STATUS_ROW = {
  marginVertical: spacing[2],
  marginLeft: spacing[2],
  flexDirection: "row"
};
var BASE_MESSAGE = {
  container: {
    flexDirection: "row",
    marginTop: 20
  },
  avatarContainer: {
    alignSelf: "flex-end"
  },
  textBubble: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.palette.moonRaker,
    paddingHorizontal: spacing[2],
    marginRight: spacing[4],
    ...Platform3.select({
      ios: {
        shadowColor: color.palette.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
      }
    })
  },
  textContent: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[4],
    color: color.palette.minsk,
    fontFamily: typography.primary
  },
  date: {
    ...STATUS_ROW
  },
  dateText: {
    fontSize: 11,
    color: color.palette.blueBell,
    fontFamily: typography.primary
  },
  error: {
    ...STATUS_ROW
  },
  errorText: {
    fontSize: 12,
    color: color.error,
    fontFamily: typography.primary
  },
  errorIcon: {
    marginRight: spacing[1],
    alignSelf: "center"
  }
};
var messagePresets = {
  sent: BASE_MESSAGE,
  received: {
    ...BASE_MESSAGE,
    container: {
      flexDirection: "row-reverse",
      marginTop: 20
    },
    textBubble: {
      ...BASE_MESSAGE.textBubble,
      marginRight: 0,
      marginLeft: spacing[4],
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 0,
      backgroundColor: color.palette.electricIndigo
    },
    textContent: {
      ...BASE_MESSAGE.textContent,
      color: color.palette.moonRaker
    },
    date: {
      ...BASE_MESSAGE.date,
      justifyContent: "flex-end",
      marginRight: spacing[2]
    },
    error: {
      ...BASE_MESSAGE.error,
      justifyContent: "flex-end",
      marginRight: spacing[2]
    }
  }
};

// src/molecules/message/message.tsx
var MessagePreview = ({ message, preset }) => {
  const text = message.text;
  const username = `Anon-${message.pubkey.slice(0, 5)}`;
  const date = message.created_at * 1e3;
  const photo = `https://placekitten.com/200/201`;
  const delivered = true;
  const messagePreset = messagePresets[preset];
  const deliveryTime = moment(date).fromNow();
  return <View4 key={`${deliveryTime}`}>
    <View4 style={messagePreset.container}>
      <View4 style={messagePreset.textBubble}><Text style={messagePreset.textContent} text={text} /></View4>
      {delivered && <View4 style={{ flexDirection: "column-reverse" }}><Image2 source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 8 }} /></View4>}
    </View4>
    <View4>{delivered ? <View4 style={messagePreset.date}><Text style={messagePreset.dateText}>
      {username}
      {" - "}
      {deliveryTime}
    </Text></View4> : null}</View4>
  </View4>;
};

// src/molecules/ChannelAvatar.tsx
import { Image as Image3 } from "react-native";
var ChannelAvatar = ({ metadata }) => {
  const picture = metadata.picture && metadata.picture.length > 4 ? metadata.picture : "http://placekitten.com/200/300";
  return <Image3 source={{ uri: picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />;
};

// src/organisms/ChannelList.tsx
import { setActiveChannelId } from "@arcadecity/use-arcade/src";
import { FlatList, StyleSheet as StyleSheet2 } from "react-native";
var ChannelList = ({ channels }) => {
  return <FlatList data={channels} keyExtractor={keyExtractor} renderItem={renderItem} style={[styles2.flatList, { backgroundColor: "#120B29" }]} />;
};
var keyExtractor = (item) => item.id;
var renderItem = ({ item }) => <ChannelPreview channel={item} onPress={() => setActiveChannelId(item.id)} />;
var styles2 = StyleSheet2.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: "absolute", right: 0, top: 0 }
});

// src/organisms/ChannelView.tsx
import { useActiveChannelId as useActiveChannelId3, useChannelMessages as useChannelMessages2 } from "@arcadecity/use-arcade/src";

// src/organisms/MessageInput.tsx
import { Alert, StyleSheet as StyleSheet3, TextInput, TouchableOpacity as TouchableOpacity2, View as View5 } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext as useContext3, useRef as useRef2, useState } from "react";
import {
  ArcadeContext,
  useActiveChannelId
} from "@arcadecity/use-arcade/src";
var MessageInput = () => {
  const [text, setText] = useState("Bro");
  const context = useContext3(ArcadeContext);
  const activeChannelId = useActiveChannelId();
  const actions = context.actions;
  const inputBoxRef = useRef2(null);
  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert("Message too short", "What is that, a message for ants?");
      return;
    }
    if (!activeChannelId) {
      Alert.alert("Error getting channel ID");
      return;
    }
    actions.sendChannelMessage(activeChannelId, text);
  };
  return <View5 style={styles3.container}><View5 style={styles3.composerContainer}><View5 style={styles3.inputContainer}>
    <TextInput autoCorrect={false} defaultValue="Bro" multiline editable={false} ref={inputBoxRef} spellCheck={false} style={styles3.inputBox} />
    <TouchableOpacity2 activeOpacity={0.8} onPress={submitInput} style={styles3.sendButtonContainer}><FontAwesome name="send" size={24} color={palette.blueBell} /></TouchableOpacity2>
  </View5></View5></View5>;
};
var styles3 = StyleSheet3.create({
  composerContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    flex: 1
  },
  container: {
    backgroundColor: palette.purple,
    borderTopWidth: 1,
    borderTopColor: palette.portGore,
    padding: 10,
    flex: 1,
    height: 60,
    width: "100%"
  },
  inputBox: {
    backgroundColor: color.field,
    color: color.text,
    flexGrow: 1,
    fontSize: 14,
    height: 40,
    borderRadius: 10,
    includeFontPadding: false,
    padding: 10,
    textAlignVertical: "center",
    outlineWidth: 0,
    opacity: 0.5
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16
  },
  sendButtonContainer: {
    marginLeft: 14
  }
});

// src/organisms/MessageList.tsx
import { useActiveChannelId as useActiveChannelId2, useChannelMessages } from "@arcadecity/use-arcade/src";
import { FlatList as FlatList2, StyleSheet as StyleSheet4, View as View6 } from "react-native";
var MessageList = () => {
  const activeChannelId = useActiveChannelId2();
  const messages = useChannelMessages(activeChannelId);
  console.log("MessageList has messages:", messages.length);
  if (!activeChannelId)
    return <></>;
  return <View6 style={styles4.container}><FlatList2 data={messages} keyExtractor={keyExtractor2} renderItem={renderItem2} style={[styles4.flatList, { backgroundColor: "#120B29" }]} /></View6>;
};
var keyExtractor2 = (item) => item.id;
var pubkey = "d67fe59472f658c1b2dec9ffd60b86af260a2f8460b441f9a891761f87b67a5d";
var renderItem2 = ({ item }) => <MessagePreview message={item} preset={pubkey === item.pubkey ? "sent" : "received"} />;
var styles4 = StyleSheet4.create({
  container: {
    paddingHorizontal: spacing[4],
    backgroundColor: color.background,
    flex: 1,
    width: "100%"
  },
  contentContainer: {
    flexGrow: 1
  },
  flatList: { flex: 1 }
});

// src/organisms/ChannelView.tsx
var ChannelView = () => {
  const activeChannelId = useActiveChannelId3();
  const messages = useChannelMessages2(activeChannelId);
  console.log(activeChannelId, messages.length);
  if (!activeChannelId)
    return <></>;
  return <div className="flex h-screen flex-grow flex-col items-stretch bg-haiti">
    <div className="border-dark-lighten flex h-20 items-center justify-between border-b px-5" />
    <div className="flex flex-grow flex-col items-stretch gap-3 pt-10 pb-1 bg-purple w-full"><MessageList /></div>
    <div className="border-dark-lighten flex h-24 items-stretch gap-1 border-t w-full"><MessageInput /></div>
  </div>;
};
export {
  ACTIVE_OPACITY,
  ChannelAvatar,
  ChannelList,
  ChannelPreview,
  ChannelPreviewScreen,
  ChannelView,
  FadeInMap,
  Map,
  MessageInput,
  MessageList,
  MessagePreview,
  Text,
  color,
  palette,
  spacing,
  typography
};
