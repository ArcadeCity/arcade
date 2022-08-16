"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  ACTIVE_OPACITY: () => ACTIVE_OPACITY,
  ChannelAvatar: () => ChannelAvatar,
  ChannelList: () => ChannelList,
  ChannelPreview: () => ChannelPreview,
  ChannelPreviewScreen: () => ChannelPreviewScreen,
  ChannelView: () => ChannelView,
  FadeInMap: () => FadeInMap,
  Map: () => Map,
  MessageInput: () => MessageInput,
  MessageList: () => MessageList,
  MessagePreview: () => MessagePreview,
  Text: () => Text,
  color: () => color,
  palette: () => palette,
  spacing: () => spacing,
  typography: () => typography
});
module.exports = __toCommonJS(src_exports);

// src/atoms/text/text.tsx
var import_ramda = require("ramda");
var import_react_native2 = require("react-native");

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
var import_react_native = require("react-native");
var typography = {
  primary: import_react_native.Platform.select({
    ios: "Inter_400Regular",
    android: "Inter_400Regular",
    web: "Inter"
  }),
  bold: import_react_native.Platform.select({ ios: "Inter_700Bold", android: "Inter_700Bold", web: "Inter_700Bold" }),
  secondary: import_react_native.Platform.select({
    ios: "Lexend_700Bold",
    android: "Lexend_700Bold",
    web: "Lexend_700Bold"
  }),
  code: import_react_native.Platform.select({ ios: "Courier", android: "monospace", web: "monospace" })
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
  const styles5 = (0, import_ramda.flatten)([style, styleOverride]);
  return <import_react_native2.Text key={tx} {...rest} style={styles5}>{content}</import_react_native2.Text>;
};
function capitalize(theString) {
  return theString.charAt(0).toUpperCase() + theString.slice(1);
}

// src/library/ChannelPreviewScreen.tsx
var import_dripsy2 = require("dripsy");

// src/molecules/ChannelPreview.tsx
var import_dripsy = require("dripsy");
var import_react_native3 = require("react-native");
var ChannelPreview = ({ channel, onPress }) => {
  var _a;
  const picture = (channel == null ? void 0 : channel.picture) && ((_a = channel == null ? void 0 : channel.picture) == null ? void 0 : _a.length) > 4 ? channel.picture : "http://placekitten.com/200/200";
  return <import_react_native3.TouchableOpacity activeOpacity={0.8} key={(channel == null ? void 0 : channel.id) ?? "asdf"} onPress={onPress} style={styles.container}>
    <import_react_native3.Image source={{ uri: picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
    <import_react_native3.View style={styles.contentContainer}>
      <import_dripsy.Text style={styles.channelName}>{(channel == null ? void 0 : channel.name) ?? "no name"}</import_dripsy.Text>
      <import_dripsy.Text style={styles.channelPreview}>{(channel == null ? void 0 : channel.about) ?? "no about"}</import_dripsy.Text>
    </import_react_native3.View>
  </import_react_native3.TouchableOpacity>;
};
var styles = import_react_native3.StyleSheet.create({
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
  return <import_dripsy2.View sx={{
    alignItems: "center",
    backgroundColor: color.background,
    paddingTop: 40
  }}>
    <import_dripsy2.H1>ChannelPreview</import_dripsy2.H1>
    <import_dripsy2.View style={{ height: 20 }} />
    <ChannelPreview channel={dummyChannel} onPress={() => console.log("Pressed ChannelPreview")} />
    <import_dripsy2.View style={{ height: 30 }} />
  </import_dripsy2.View>;
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
var import_react_native4 = require("react-native");
var typography2 = {
  primary: import_react_native4.Platform.select({
    ios: "Inter_400Regular",
    android: "Inter_400Regular",
    web: "Inter"
  }),
  bold: import_react_native4.Platform.select({ ios: "Inter_700Bold", android: "Inter_700Bold", web: "Inter_700Bold" }),
  secondary: import_react_native4.Platform.select({
    ios: "Lexend_700Bold",
    android: "Lexend_700Bold",
    web: "Lexend_700Bold"
  }),
  code: import_react_native4.Platform.select({ ios: "Courier", android: "monospace", web: "monospace" })
};

// src/molecules/map/map.tsx
var import_react_native_webview = require("react-native-webview");
var Map = () => {
  return <import_react_native_webview.WebView style={{ backgroundColor: palette2.haiti, flex: 1 }} source={{ uri: "https://map-demo.arcade.city" }} />;
};

// ../../node_modules/moti/build/core/motify.js
var import_react5 = __toESM(require("react"));
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));

// ../../node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var import_react = require("react");
var PresenceContext = (0, import_react.createContext)(null);

// ../../node_modules/framer-motion/dist/es/utils/use-constant.mjs
var import_react2 = require("react");
function useConstant(init) {
  var ref = (0, import_react2.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var import_react3 = require("react");

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
  var context = (0, import_react3.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id = useId();
  (0, import_react3.useEffect)(function() {
    return register(id);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// ../../node_modules/moti/build/core/use-motify.js
var import_react4 = require("react");
var import_react_native_reanimated = require("react-native-reanimated");

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
    animation = import_react_native_reanimated.withTiming;
  } else if (animationType === "spring") {
    animation = import_react_native_reanimated.withSpring;
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
    animation = import_react_native_reanimated.withDecay;
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
  const isMounted = (0, import_react_native_reanimated.useSharedValue)(false);
  const [isPresent, safeToUnmount] = usePresence();
  const presence = (0, import_react4.useContext)(PresenceContext);
  const disableInitialAnimation = (presence == null ? void 0 : presence.initial) === false && !animateInitialState;
  const custom = (0, import_react4.useCallback)(() => {
    "worklet";
    return presence == null ? void 0 : presence.custom;
  }, [presence]);
  const reanimatedSafeToUnmount = (0, import_react4.useCallback)(() => {
    safeToUnmount == null ? void 0 : safeToUnmount();
  }, [safeToUnmount]);
  const reanimatedOnDidAnimated = (0, import_react4.useCallback)((...args) => {
    onDidAnimate == null ? void 0 : onDidAnimate(...args);
  }, [onDidAnimate]);
  const hasExitStyle = Boolean(typeof exitProp === "function" || typeof exitProp === "object" && exitProp && Object.keys(exitProp).length > 0);
  const style = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
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
          (0, import_react_native_reanimated.runOnJS)(reanimatedOnDidAnimated)(
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
            (0, import_react_native_reanimated.runOnJS)(reanimatedSafeToUnmount)();
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
              sequence.push((0, import_react_native_reanimated.withDelay)(stepDelay, sequenceValue));
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
                let finalValue = (0, import_react_native_reanimated.withSequence)(sequence[0], ...sequence.slice(1));
                if (shouldRepeat) {
                  finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
                }
                transform[transformKey] = finalValue;
              }
            } else {
              if (((_b = transition == null ? void 0 : transition[transformKey]) == null ? void 0 : _b.delay) != null) {
                delayMs = (_c = transition == null ? void 0 : transition[transformKey]) == null ? void 0 : _c.delay;
              }
              let finalValue = animation(transformValue, config, callback);
              if (shouldRepeat) {
                finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
              }
              if (delayMs != null) {
                transform[transformKey] = (0, import_react_native_reanimated.withDelay)(delayMs, finalValue);
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
        let finalValue = (0, import_react_native_reanimated.withSequence)(sequence[0], ...sequence.slice(1));
        if (shouldRepeat) {
          finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
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
          finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
        }
        if (delayMs != null) {
          transform[key] = (0, import_react_native_reanimated.withDelay)(delayMs, finalValue);
        } else {
          transform[key] = finalValue;
        }
        final["transform"].push(transform);
      } else if (typeof value === "object") {
        final[key] = {};
        for (const innerStyleKey in value || {}) {
          let finalValue = animation(value, config, callback);
          if (shouldRepeat) {
            finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
          }
          if (delayMs != null) {
            final[key][innerStyleKey] = (0, import_react_native_reanimated.withDelay)(delayMs, finalValue);
          } else {
            final[key][innerStyleKey] = finalValue;
          }
        }
      } else {
        let finalValue = animation(value, config, callback);
        if (shouldRepeat) {
          finalValue = (0, import_react_native_reanimated.withRepeat)(finalValue, repeatCount, repeatReverse);
        }
        if (delayMs != null && typeof delayMs === "number") {
          final[key] = (0, import_react_native_reanimated.withDelay)(delayMs, finalValue);
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
  (0, import_react4.useEffect)(() => {
    isMounted.value = true;
  }, [isMounted]);
  (0, import_react4.useEffect)(function allowUnMountIfMissingExit() {
    if (!isPresent && !hasExitStyle) {
      reanimatedSafeToUnmount();
    }
  }, [hasExitStyle, isPresent, reanimatedSafeToUnmount]);
  return {
    style
  };
}

// ../../node_modules/moti/build/core/motify.js
var { createAnimatedComponent } = import_react_native_reanimated2.default;
function motify(ComponentWithoutAnimation) {
  const Component = createAnimatedComponent(ComponentWithoutAnimation);
  const withAnimations = () => {
    const Motified = (0, import_react5.forwardRef)(function Moti({ animate, style, from, transition, delay, state, stylePriority, onDidAnimate, exit, animateInitialState, exitTransition, ...props }, ref) {
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
      return import_react5.default.createElement(Component, Object.assign({}, props, { style: style ? [style, animated.style] : animated.style, ref }));
    });
    Motified.displayName = `Moti.${ComponentWithoutAnimation.displayName || ComponentWithoutAnimation.name || "NoName"}`;
    return Motified;
  };
  return withAnimations;
}

// ../../node_modules/moti/build/components/view.js
var import_react_native5 = require("react-native");
var View3 = motify(import_react_native5.View)();

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
var import_react_native7 = require("react-native");
var import_moment = __toESM(require("moment"));

// src/molecules/message/message.presets.ts
var import_react_native6 = require("react-native");
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
    ...import_react_native6.Platform.select({
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
  const deliveryTime = (0, import_moment.default)(date).fromNow();
  return <import_react_native7.View key={`${deliveryTime}`}>
    <import_react_native7.View style={messagePreset.container}>
      <import_react_native7.View style={messagePreset.textBubble}><Text style={messagePreset.textContent} text={text} /></import_react_native7.View>
      {delivered && <import_react_native7.View style={{ flexDirection: "column-reverse" }}><import_react_native7.Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 8 }} /></import_react_native7.View>}
    </import_react_native7.View>
    <import_react_native7.View>{delivered ? <import_react_native7.View style={messagePreset.date}><Text style={messagePreset.dateText}>
      {username}
      {" - "}
      {deliveryTime}
    </Text></import_react_native7.View> : null}</import_react_native7.View>
  </import_react_native7.View>;
};

// src/molecules/ChannelAvatar.tsx
var import_react_native8 = require("react-native");
var ChannelAvatar = ({ metadata }) => {
  const picture = metadata.picture && metadata.picture.length > 4 ? metadata.picture : "http://placekitten.com/200/300";
  return <import_react_native8.Image source={{ uri: picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />;
};

// src/organisms/ChannelList.tsx
var import_src = require("@arcadecity/use-arcade/src");
var import_react_native9 = require("react-native");
var ChannelList = ({ channels }) => {
  return <import_react_native9.FlatList data={channels} keyExtractor={keyExtractor} renderItem={renderItem} style={[styles2.flatList, { backgroundColor: "#120B29" }]} />;
};
var keyExtractor = (item) => item.id;
var renderItem = ({ item }) => <ChannelPreview channel={item} onPress={() => (0, import_src.setActiveChannelId)(item.id)} />;
var styles2 = import_react_native9.StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: "absolute", right: 0, top: 0 }
});

// src/organisms/ChannelView.tsx
var import_src4 = require("@arcadecity/use-arcade/src");

// src/organisms/MessageInput.tsx
var import_react_native10 = require("react-native");
var import_vector_icons = require("@expo/vector-icons");
var import_react6 = require("react");
var import_src2 = require("@arcadecity/use-arcade/src");
var MessageInput = () => {
  const [text, setText] = (0, import_react6.useState)("Bro");
  const context = (0, import_react6.useContext)(import_src2.ArcadeContext);
  const activeChannelId = (0, import_src2.useActiveChannelId)();
  const actions = context.actions;
  const inputBoxRef = (0, import_react6.useRef)(null);
  const submitInput = () => {
    if (text.length < 1) {
      import_react_native10.Alert.alert("Message too short", "What is that, a message for ants?");
      return;
    }
    if (!activeChannelId) {
      import_react_native10.Alert.alert("Error getting channel ID");
      return;
    }
    actions.sendChannelMessage(activeChannelId, text);
  };
  return <import_react_native10.View style={styles3.container}><import_react_native10.View style={styles3.composerContainer}><import_react_native10.View style={styles3.inputContainer}>
    <import_react_native10.TextInput autoCorrect={false} defaultValue="Bro" multiline editable={false} ref={inputBoxRef} spellCheck={false} style={styles3.inputBox} />
    <import_react_native10.TouchableOpacity activeOpacity={0.8} onPress={submitInput} style={styles3.sendButtonContainer}><import_vector_icons.FontAwesome name="send" size={24} color={palette.blueBell} /></import_react_native10.TouchableOpacity>
  </import_react_native10.View></import_react_native10.View></import_react_native10.View>;
};
var styles3 = import_react_native10.StyleSheet.create({
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
var import_src3 = require("@arcadecity/use-arcade/src");
var import_react_native11 = require("react-native");
var MessageList = () => {
  const activeChannelId = (0, import_src3.useActiveChannelId)();
  const messages = (0, import_src3.useChannelMessages)(activeChannelId);
  console.log("MessageList has messages:", messages.length);
  if (!activeChannelId)
    return <></>;
  return <import_react_native11.View style={styles4.container}><import_react_native11.FlatList data={messages} keyExtractor={keyExtractor2} renderItem={renderItem2} style={[styles4.flatList, { backgroundColor: "#120B29" }]} /></import_react_native11.View>;
};
var keyExtractor2 = (item) => item.id;
var pubkey = "d67fe59472f658c1b2dec9ffd60b86af260a2f8460b441f9a891761f87b67a5d";
var renderItem2 = ({ item }) => <MessagePreview message={item} preset={pubkey === item.pubkey ? "sent" : "received"} />;
var styles4 = import_react_native11.StyleSheet.create({
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
  const activeChannelId = (0, import_src4.useActiveChannelId)();
  const messages = (0, import_src4.useChannelMessages)(activeChannelId);
  console.log(activeChannelId, messages.length);
  if (!activeChannelId)
    return <></>;
  return <div className="flex h-screen flex-grow flex-col items-stretch bg-haiti">
    <div className="border-dark-lighten flex h-20 items-center justify-between border-b px-5" />
    <div className="flex flex-grow flex-col items-stretch gap-3 pt-10 pb-1 bg-purple w-full"><MessageList /></div>
    <div className="border-dark-lighten flex h-24 items-stretch gap-1 border-t w-full"><MessageInput /></div>
  </div>;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
