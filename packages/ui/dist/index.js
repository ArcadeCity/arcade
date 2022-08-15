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

// src/molecules/map/FadeInMap.tsx
var import_dripsy3 = require("dripsy");

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

// src/molecules/map/FadeInMap.tsx
var FadeInMap = () => {
  return <>
    <import_dripsy3.View style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      position: "absolute",
      zIndex: 7888,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }} />
    <Map />
  </>;
};

// src/molecules/message/message.tsx
var import_react_native6 = require("react-native");
var import_moment = __toESM(require("moment"));

// src/molecules/message/message.presets.ts
var import_react_native5 = require("react-native");
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
    ...import_react_native5.Platform.select({
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
  return <import_react_native6.View key={`${deliveryTime}`}>
    <import_react_native6.View style={messagePreset.container}>
      <import_react_native6.View style={messagePreset.textBubble}><Text style={messagePreset.textContent} text={text} /></import_react_native6.View>
      {delivered && <import_react_native6.View style={{ flexDirection: "column-reverse" }}><import_react_native6.Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 8 }} /></import_react_native6.View>}
    </import_react_native6.View>
    <import_react_native6.View>{delivered ? <import_react_native6.View style={messagePreset.date}><Text style={messagePreset.dateText}>
      {username}
      {" - "}
      {deliveryTime}
    </Text></import_react_native6.View> : null}</import_react_native6.View>
  </import_react_native6.View>;
};

// src/molecules/ChannelAvatar.tsx
var import_react_native7 = require("react-native");
var ChannelAvatar = ({ metadata }) => {
  const picture = metadata.picture && metadata.picture.length > 4 ? metadata.picture : "http://placekitten.com/200/300";
  return <import_react_native7.Image source={{ uri: picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />;
};

// src/organisms/ChannelList.tsx
var import_src = require("@arcadecity/use-arcade/src");
var import_react_native8 = require("react-native");
var ChannelList = ({ channels }) => {
  return <import_react_native8.FlatList data={channels} keyExtractor={keyExtractor} renderItem={renderItem} style={[styles2.flatList, { backgroundColor: "#120B29" }]} />;
};
var keyExtractor = (item) => item.id;
var renderItem = ({ item }) => <ChannelPreview channel={item} onPress={() => (0, import_src.setActiveChannelId)(item.id)} />;
var styles2 = import_react_native8.StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: "absolute", right: 0, top: 0 }
});

// src/organisms/ChannelView.tsx
var import_src4 = require("@arcadecity/use-arcade/src");

// src/organisms/MessageInput.tsx
var import_react_native9 = require("react-native");
var import_vector_icons = require("@expo/vector-icons");
var import_react = require("react");
var import_src2 = require("@arcadecity/use-arcade/src");
var MessageInput = () => {
  const [text, setText] = (0, import_react.useState)("Bro");
  const context = (0, import_react.useContext)(import_src2.ArcadeContext);
  const activeChannelId = (0, import_src2.useActiveChannelId)();
  const actions = context.actions;
  const inputBoxRef = (0, import_react.useRef)(null);
  const submitInput = () => {
    if (text.length < 1) {
      import_react_native9.Alert.alert("Message too short", "What is that, a message for ants?");
      return;
    }
    if (!activeChannelId) {
      import_react_native9.Alert.alert("Error getting channel ID");
      return;
    }
    actions.sendChannelMessage(activeChannelId, text);
  };
  return <import_react_native9.View style={styles3.container}><import_react_native9.View style={styles3.composerContainer}><import_react_native9.View style={styles3.inputContainer}>
    <import_react_native9.TextInput autoCorrect={false} defaultValue="Bro" multiline editable={false} ref={inputBoxRef} spellCheck={false} style={styles3.inputBox} />
    <import_react_native9.TouchableOpacity activeOpacity={0.8} onPress={submitInput} style={styles3.sendButtonContainer}><import_vector_icons.FontAwesome name="send" size={24} color={palette.blueBell} /></import_react_native9.TouchableOpacity>
  </import_react_native9.View></import_react_native9.View></import_react_native9.View>;
};
var styles3 = import_react_native9.StyleSheet.create({
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
var import_react_native10 = require("react-native");
var MessageList = () => {
  const activeChannelId = (0, import_src3.useActiveChannelId)();
  const messages = (0, import_src3.useChannelMessages)(activeChannelId);
  console.log("MessageList has messages:", messages.length);
  if (!activeChannelId)
    return <></>;
  return <import_react_native10.View style={styles4.container}><import_react_native10.FlatList data={messages} keyExtractor={keyExtractor2} renderItem={renderItem2} style={[styles4.flatList, { backgroundColor: "#120B29" }]} /></import_react_native10.View>;
};
var keyExtractor2 = (item) => item.id;
var pubkey = "d67fe59472f658c1b2dec9ffd60b86af260a2f8460b441f9a891761f87b67a5d";
var renderItem2 = ({ item }) => <MessagePreview message={item} preset={pubkey === item.pubkey ? "sent" : "received"} />;
var styles4 = import_react_native10.StyleSheet.create({
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
