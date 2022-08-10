import * as react_native from 'react-native';
import { TextStyle, TextProps as TextProps$1, StyleProp } from 'react-native';

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
declare const presets: {
    /**
     * The default text styles.
     */
    default: TextStyle;
    /**
     * A bold version of the default text.
     */
    bold: TextStyle;
    /**
     * A super bold version of the default text.
     */
    superBold: TextStyle;
    /**
     * Header text.
     */
    header: TextStyle;
    /**
     * Large bold headers.
     */
    title: TextStyle;
    /**
     * Medium/large, non-bold
     */
    title2: TextStyle;
    title3: {
        fontSize: number;
        lineHeight: number;
        marginVertical: number;
        fontFamily: string | undefined;
        color?: react_native.ColorValue | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        letterSpacing?: number | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
        textDecorationColor?: react_native.ColorValue | undefined;
        textShadowColor?: react_native.ColorValue | undefined;
        textShadowOffset?: {
            width: number;
            height: number;
        } | undefined;
        textShadowRadius?: number | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
        testID?: string | undefined;
        fontVariant?: react_native.FontVariant[] | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | undefined;
        backfaceVisibility?: "visible" | "hidden" | undefined;
        backgroundColor?: react_native.ColorValue | undefined;
        borderBottomColor?: react_native.ColorValue | undefined;
        borderBottomEndRadius?: number | undefined;
        borderBottomLeftRadius?: number | undefined;
        borderBottomRightRadius?: number | undefined;
        borderBottomStartRadius?: number | undefined;
        borderBottomWidth?: number | undefined;
        borderColor?: react_native.ColorValue | undefined;
        borderEndColor?: react_native.ColorValue | undefined;
        borderLeftColor?: react_native.ColorValue | undefined;
        borderLeftWidth?: number | undefined;
        borderRadius?: number | undefined;
        borderRightColor?: react_native.ColorValue | undefined;
        borderRightWidth?: number | undefined;
        borderStartColor?: react_native.ColorValue | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | undefined;
        borderTopColor?: react_native.ColorValue | undefined;
        borderTopEndRadius?: number | undefined;
        borderTopLeftRadius?: number | undefined;
        borderTopRightRadius?: number | undefined;
        borderTopStartRadius?: number | undefined;
        borderTopWidth?: number | undefined;
        borderWidth?: number | undefined;
        opacity?: number | undefined;
        elevation?: number | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined;
        alignItems?: react_native.FlexAlignType | undefined;
        alignSelf?: "auto" | react_native.FlexAlignType | undefined;
        aspectRatio?: number | undefined;
        borderEndWidth?: string | number | undefined;
        borderStartWidth?: string | number | undefined;
        bottom?: string | number | undefined;
        display?: "none" | "flex" | undefined;
        end?: string | number | undefined;
        flex?: number | undefined;
        flexBasis?: string | number | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
        flexGrow?: number | undefined;
        flexShrink?: number | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
        height?: string | number | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
        left?: string | number | undefined;
        margin?: string | number | undefined;
        marginBottom?: string | number | undefined;
        marginEnd?: string | number | undefined;
        marginHorizontal?: string | number | undefined;
        marginLeft?: string | number | undefined;
        marginRight?: string | number | undefined;
        marginStart?: string | number | undefined;
        marginTop?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        overflow?: "visible" | "hidden" | "scroll" | undefined;
        padding?: string | number | undefined;
        paddingBottom?: string | number | undefined;
        paddingEnd?: string | number | undefined;
        paddingHorizontal?: string | number | undefined;
        paddingLeft?: string | number | undefined;
        paddingRight?: string | number | undefined;
        paddingStart?: string | number | undefined;
        paddingTop?: string | number | undefined;
        paddingVertical?: string | number | undefined;
        position?: "absolute" | "relative" | undefined;
        right?: string | number | undefined;
        start?: string | number | undefined;
        top?: string | number | undefined;
        width?: string | number | undefined;
        zIndex?: number | undefined;
        direction?: "ltr" | "rtl" | "inherit" | undefined;
        shadowColor?: react_native.ColorValue | undefined;
        shadowOffset?: {
            width: number;
            height: number;
        } | undefined;
        shadowOpacity?: number | undefined;
        shadowRadius?: number | undefined;
        transform?: (react_native.PerpectiveTransform | react_native.RotateTransform | react_native.RotateXTransform | react_native.RotateYTransform | react_native.RotateZTransform | react_native.ScaleTransform | react_native.ScaleXTransform | react_native.ScaleYTransform | react_native.TranslateXTransform | react_native.TranslateYTransform | react_native.SkewXTransform | react_native.SkewYTransform | react_native.MatrixTransform)[] | undefined;
        transformMatrix?: number[] | undefined;
        rotation?: number | undefined;
        scaleX?: number | undefined;
        scaleY?: number | undefined;
        translateX?: number | undefined;
        translateY?: number | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
        includeFontPadding?: boolean | undefined;
    };
    /**
     * Description text that shows up below titles.
     */
    description: TextStyle;
    descriptionSlim: {
        color?: react_native.ColorValue | undefined;
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        letterSpacing?: number | undefined;
        lineHeight?: number | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
        textDecorationColor?: react_native.ColorValue | undefined;
        textShadowColor?: react_native.ColorValue | undefined;
        textShadowOffset?: {
            width: number;
            height: number;
        } | undefined;
        textShadowRadius?: number | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
        testID?: string | undefined;
        fontVariant?: react_native.FontVariant[] | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | undefined;
        backfaceVisibility?: "visible" | "hidden" | undefined;
        backgroundColor?: react_native.ColorValue | undefined;
        borderBottomColor?: react_native.ColorValue | undefined;
        borderBottomEndRadius?: number | undefined;
        borderBottomLeftRadius?: number | undefined;
        borderBottomRightRadius?: number | undefined;
        borderBottomStartRadius?: number | undefined;
        borderBottomWidth?: number | undefined;
        borderColor?: react_native.ColorValue | undefined;
        borderEndColor?: react_native.ColorValue | undefined;
        borderLeftColor?: react_native.ColorValue | undefined;
        borderLeftWidth?: number | undefined;
        borderRadius?: number | undefined;
        borderRightColor?: react_native.ColorValue | undefined;
        borderRightWidth?: number | undefined;
        borderStartColor?: react_native.ColorValue | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | undefined;
        borderTopColor?: react_native.ColorValue | undefined;
        borderTopEndRadius?: number | undefined;
        borderTopLeftRadius?: number | undefined;
        borderTopRightRadius?: number | undefined;
        borderTopStartRadius?: number | undefined;
        borderTopWidth?: number | undefined;
        borderWidth?: number | undefined;
        opacity?: number | undefined;
        elevation?: number | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined;
        alignItems?: react_native.FlexAlignType | undefined;
        alignSelf?: "auto" | react_native.FlexAlignType | undefined;
        aspectRatio?: number | undefined;
        borderEndWidth?: string | number | undefined;
        borderStartWidth?: string | number | undefined;
        bottom?: string | number | undefined;
        display?: "none" | "flex" | undefined;
        end?: string | number | undefined;
        flex?: number | undefined;
        flexBasis?: string | number | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
        flexGrow?: number | undefined;
        flexShrink?: number | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
        height?: string | number | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
        left?: string | number | undefined;
        margin?: string | number | undefined;
        marginBottom?: string | number | undefined;
        marginEnd?: string | number | undefined;
        marginHorizontal?: string | number | undefined;
        marginLeft?: string | number | undefined;
        marginRight?: string | number | undefined;
        marginStart?: string | number | undefined;
        marginTop?: string | number | undefined;
        marginVertical?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        overflow?: "visible" | "hidden" | "scroll" | undefined;
        padding?: string | number | undefined;
        paddingBottom?: string | number | undefined;
        paddingEnd?: string | number | undefined;
        paddingHorizontal?: string | number | undefined;
        paddingLeft?: string | number | undefined;
        paddingRight?: string | number | undefined;
        paddingStart?: string | number | undefined;
        paddingTop?: string | number | undefined;
        paddingVertical?: string | number | undefined;
        position?: "absolute" | "relative" | undefined;
        right?: string | number | undefined;
        start?: string | number | undefined;
        top?: string | number | undefined;
        width?: string | number | undefined;
        zIndex?: number | undefined;
        direction?: "ltr" | "rtl" | "inherit" | undefined;
        shadowColor?: react_native.ColorValue | undefined;
        shadowOffset?: {
            width: number;
            height: number;
        } | undefined;
        shadowOpacity?: number | undefined;
        shadowRadius?: number | undefined;
        transform?: (react_native.PerpectiveTransform | react_native.RotateTransform | react_native.RotateXTransform | react_native.RotateYTransform | react_native.RotateZTransform | react_native.ScaleTransform | react_native.ScaleXTransform | react_native.ScaleYTransform | react_native.TranslateXTransform | react_native.TranslateYTransform | react_native.SkewXTransform | react_native.SkewYTransform | react_native.MatrixTransform)[] | undefined;
        transformMatrix?: number[] | undefined;
        rotation?: number | undefined;
        scaleX?: number | undefined;
        scaleY?: number | undefined;
        translateX?: number | undefined;
        translateY?: number | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
        includeFontPadding?: boolean | undefined;
    };
    /**
     * Labels that appear on forms above the inputs or on buttons.
     */
    label: TextStyle;
    /**
     * Labels that appear on forms above the inputs or on buttons.
     * dori TODO: WHEN CONCATENATE PRESET + STYLE RECEIVE ARRAY INDEX like { "0": color...}
     * is why we create new presetes
     */
    labelCancel: TextStyle;
    /**
     * Labels that appear on forms above the inputs or on buttons.
     * dori TODO: WHEN CONCATENATE PRESET + STYLE RECEIVE ARRAY INDEX like { "0": color...}
     * is why we create new presetes
     */
    labelAccept: TextStyle;
    /**
     * Labels that appear on secondary buttons.
     */
    secondaryLabel: TextStyle;
    /**
     * Section header text.
     */
    sectionHeader: TextStyle;
    /**
     * Appears below the form field when there is a problem.
     */
    error: TextStyle;
    /**
     * Link text.
     */
    link: TextStyle;
    /**
     * Small secondary text.
     */
    small: TextStyle;
    /**
     * Detail secondary text.
     */
    detail: TextStyle;
};
/**
 * A list of preset names.
 */
declare type TextPresetNames = keyof typeof presets;

interface TextProps extends TextProps$1 {
    /**
     * Children components.
     */
    children?: React.ReactNode;
    /**
     * Text which is looked up via i18n.
     */
    tx?: any;
    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */
    txOptions?: any;
    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: string | null;
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<TextStyle>;
    /**
     * One of the different types of text presets.
     */
    preset?: TextPresetNames;
    /**
     * Should we capitalize?
     */
    capitalize?: boolean;
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
declare const Text: (props: TextProps) => JSX.Element;

declare function ChannelPreviewScreen(): JSX.Element;

declare const ACTIVE_OPACITY = 0.8;
/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
declare const color: {
    /**
     * The palette is available to use, but prefer using the name.
     */
    palette: {
        arwes: string;
        arwesTitle: string;
        arwesText: string;
        arwesFade: string;
        arwesFader: string;
        arwesSecondary: string;
        white: string;
        black: string;
        haiti: string;
        purple: string;
        portGore: string;
        blueBell: string;
        blueBellFaded: string;
        minsk: string;
        moonRaker: string;
        radicalRed: string;
        pinkFlamingo: string;
        electricViolet: string;
        electricIndigo: string;
        blueBright: string;
    };
    /**
     * A helper for making something see-thru. Use sparingly as many layers of transparency
     * can cause older Android devices to slow down due to the excessive compositing required
     * by their under-powered GPUs.
     */
    transparent: string;
    /**
     * The screen background.
     */
    background: string;
    /**
     * The main tinting color.
     */
    primary: string;
    /**
     * The secondary tinting color.
     */
    secondary: string;
    /**
     * A subtle color used for highlighting info.
     */
    info: string;
    /**
     * A subtle color used for borders and lines.
     */
    line: string;
    /**
     * A subtle color used for form fields.
     */
    field: string;
    /**
     * A subtle color used for the tab bar.
     */
    tabbar: string;
    /**
     * The default color of text in many components.
     */
    text: string;
    /**
     * The color of text in many secondary components.
     */
    secondaryText: string;
    /**
     * Secondard information.
     */
    dim: string;
    /**
     * A color to highlight current location.
     */
    origin: string;
    /**
     * For link text.
     */
    link: string;
    /**
     * A bright color used to indicate active states.
     */
    active: string;
    /**
     * A color to highlight destination(s).
     */
    destination: string;
    /**
     * A color to highlight.
     */
    highlight: string;
    /**
     * Error messages and icons.
     */
    error: string;
    /**
     * Shadow color.
     */
    shadow: string;
};

declare const palette: {
    arwes: string;
    arwesTitle: string;
    arwesText: string;
    arwesFade: string;
    arwesFader: string;
    arwesSecondary: string;
    white: string;
    black: string;
    haiti: string;
    purple: string;
    portGore: string;
    blueBell: string;
    blueBellFaded: string;
    minsk: string;
    moonRaker: string;
    radicalRed: string;
    pinkFlamingo: string;
    electricViolet: string;
    electricIndigo: string;
    blueBright: string;
};

/**
 * NOTE TO DEVS:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */
/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
declare const spacing: number[];

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
declare const typography: {
    /**
     * The primary font.  Used in most places.
     */
    primary: string | undefined;
    bold: string | undefined;
    /**
     * An alternate font used for perhaps titles and stuff.
     */
    secondary: string | undefined;
    /**
     * Lets get fancy with a monospace font!
     */
    code: string | undefined;
};

export { ACTIVE_OPACITY, ChannelPreviewScreen, Text, color, palette, spacing, typography };
