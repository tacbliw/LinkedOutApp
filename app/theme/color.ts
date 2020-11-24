import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: palette.white,
  /**
   * The main tinting color.
   */
  primary: palette.orange,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.white,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,
  /**
   * Logout button icon and text
   */
  logout: palette.logout,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,

  // custom color from @native-base\src\theme\variables
  brandPrimary: '#EB6759', // android '#1b1b1b',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#230202',
  brandLight: '#a9a9a9',

  // custom
  placeHolder: 'rgba(217,188,188,1)',
  googleIcon: 'rgba(233,13,28,0.85)',
  headerBottomLine: "#dfe6e9",
  backgroundColor: "#FFFFFF",
  backgroundSetting: '#f3e5f5',
  pickerOption: '#ffab91',

  // color custom
  "color-primary-100": "#FFEDE3",
  "color-primary-200": "#FFD6C7",
  "color-primary-300": "#FFBBAC",
  "color-primary-400": "#FFA197",
  "color-primary-500": "#FF7675",
  "color-primary-600": "#DB5560",
  "color-primary-700": "#B73A4F",
  "color-primary-800": "#932541",
  "color-primary-900": "#7A1638",
  "color-primary-transparent-100": "rgba(255, 118, 117, 0.08)",
  "color-primary-transparent-200": "rgba(255, 118, 117, 0.16)",
  "color-primary-transparent-300": "rgba(255, 118, 117, 0.24)",
  "color-primary-transparent-400": "rgba(255, 118, 117, 0.32)",
  "color-primary-transparent-500": "rgba(255, 118, 117, 0.4)",
  "color-primary-transparent-600": "rgba(255, 118, 117, 0.48)",
  "color-success-100": "#F5FCD9",
  "color-success-200": "#E9FAB5",
  "color-success-300": "#D4F18D",
  "color-success-400": "#BDE46D",
  "color-success-500": "#9ED341",
  "color-success-600": "#7FB52F",
  "color-success-700": "#639720",
  "color-success-800": "#4A7A14",
  "color-success-900": "#37650C",
  "color-success-transparent-100": "rgba(158, 211, 65, 0.08)",
  "color-success-transparent-200": "rgba(158, 211, 65, 0.16)",
  "color-success-transparent-300": "rgba(158, 211, 65, 0.24)",
  "color-success-transparent-400": "rgba(158, 211, 65, 0.32)",
  "color-success-transparent-500": "rgba(158, 211, 65, 0.4)",
  "color-success-transparent-600": "rgba(158, 211, 65, 0.48)",
  "color-info-100": "#DDF0FF",
  "color-info-200": "#BBDFFF",
  "color-info-300": "#99CCFF",
  "color-info-400": "#80BAFF",
  "color-info-500": "#569CFF",
  "color-info-600": "#3E79DB",
  "color-info-700": "#2B59B7",
  "color-info-800": "#1B3E93",
  "color-info-900": "#102A7A",
  "color-info-transparent-100": "rgba(86, 156, 255, 0.08)",
  "color-info-transparent-200": "rgba(86, 156, 255, 0.16)",
  "color-info-transparent-300": "rgba(86, 156, 255, 0.24)",
  "color-info-transparent-400": "rgba(86, 156, 255, 0.32)",
  "color-info-transparent-500": "rgba(86, 156, 255, 0.4)",
  "color-info-transparent-600": "rgba(86, 156, 255, 0.48)",
  "color-warning-100": "#FEFADA",
  "color-warning-200": "#FEF4B5",
  "color-warning-300": "#FEEC8F",
  "color-warning-400": "#FDE474",
  "color-warning-500": "#FCD846",
  "color-warning-600": "#D8B433",
  "color-warning-700": "#B59223",
  "color-warning-800": "#927216",
  "color-warning-900": "#785A0D",
  "color-warning-transparent-100": "rgba(252, 216, 70, 0.08)",
  "color-warning-transparent-200": "rgba(252, 216, 70, 0.16)",
  "color-warning-transparent-300": "rgba(252, 216, 70, 0.24)",
  "color-warning-transparent-400": "rgba(252, 216, 70, 0.32)",
  "color-warning-transparent-500": "rgba(252, 216, 70, 0.4)",
  "color-warning-transparent-600": "rgba(252, 216, 70, 0.48)",
  "color-danger-100": "#FFEDE4",
  "color-danger-200": "#FFD8C9",
  "color-danger-300": "#FFBEAF",
  "color-danger-400": "#FFA59B",
  "color-danger-500": "#FF7C7A",
  "color-danger-600": "#DB5962",
  "color-danger-700": "#B73D50",
  "color-danger-800": "#932641",
  "color-danger-900": "#7A1737",
  "color-danger-transparent-100": "rgba(255, 124, 122, 0.08)",
  "color-danger-transparent-200": "rgba(255, 124, 122, 0.16)",
  "color-danger-transparent-300": "rgba(255, 124, 122, 0.24)",
  "color-danger-transparent-400": "rgba(255, 124, 122, 0.32)",
  "color-danger-transparent-500": "rgba(255, 124, 122, 0.4)",
  "color-danger-transparent-600": "rgba(255, 124, 122, 0.48)",

  "color-gray-100": "#F7FBFD",
  "color-gray-200": "#EFF7FC",
  "color-gray-300": "#E4EFF7",
  "color-gray-400": "#D8E4EF",
  "color-gray-500": "#C8D6E5",
  "color-gray-600": "#92A8C4",
  "color-gray-700": "#647DA4",
  "color-gray-800": "#3F5784",
  "color-gray-900": "#263B6D",
  "color-gray-transparent-100": "rgba(200, 214, 229, 0.08)",
  "color-gray-transparent-200": "rgba(200, 214, 229, 0.16)",
  "color-gray-transparent-300": "rgba(200, 214, 229, 0.24)",
  "color-gray-transparent-400": "rgba(200, 214, 229, 0.32)",
  "color-gray-transparent-500": "rgba(200, 214, 229, 0.4)",
  "color-gray-transparent-600": "rgba(200, 214, 229, 0.48)",
}
