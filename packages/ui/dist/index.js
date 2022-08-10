"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  ACTIVE_OPACITY: () => ACTIVE_OPACITY,
  ChannelList: () => ChannelList,
  ChannelPreviewScreen: () => ChannelPreviewScreen,
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
    web: "Inter_400Regular"
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
  const styles2 = (0, import_ramda.flatten)([style, styleOverride]);
  return <import_react_native2.Text key={tx} {...rest} style={styles2}>{content}</import_react_native2.Text>;
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
  const picture = (channel == null ? void 0 : channel.picture) && ((_a = channel == null ? void 0 : channel.picture) == null ? void 0 : _a.length) > 4 ? channel.picture : "http://placekitten.com/200/300";
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

// src/organisms/ChannelList.tsx
var import_dripsy3 = require("dripsy");
var ChannelList = () => {
  return <import_dripsy3.Text sx={{ color: palette.moonRaker, textAlign: "center", mb: 16, fontWeight: "bold" }}>ChannelList, bitches</import_dripsy3.Text>;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACTIVE_OPACITY,
  ChannelList,
  ChannelPreviewScreen,
  Text,
  color,
  palette,
  spacing,
  typography
});
