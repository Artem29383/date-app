export enum Colors {
  black = "#000",
  blue = "#5E81F4",
  green = "#57d038",
  barColor = "#051e34",
  bordergray = "#e0e0e0",
  borderbottombr = "#c3cfdd",
  sbercolor = "#d9edf1",
  argent = "#888888",
  primary = "#1b3a57",
  bombay = "#acafb5",
  iconColor = "#8595A8",
  red = "#f11414",
  gray = "#CACCCF",
  bluebutton = "#1a73e8",
  white = "#fff",
  cornFlowerBlue = "#638cff",
  melrose = "#9392ff",
  terracotta = "#e37364",
  googleColorText = "#669df6",
  instaPlaceholder = "#8e8e8e",
  instaCross = "#b6b3b3",
  instaDefault = "#262626"
}

export enum FONTS {
  CabinBold = "CabinBold, sans-serif",
  CabinMedium = "CabinMedium, sans-serif",
  CabinRegular = "CabinRegular, sans-serif",
  GeoramaLight = "GeoramaLight, sans-serif",
  GeoramaRegular = "GeoramaRegular, sans-serif",
  GeoramaMedium = "GeoramaMedium, sans-serif",
  GeoramaBold = "GeoramaBold, sans-serif",
  GeoramaExtraBold = "GeoramaExtraBold, sans-serif"
}

export enum ANIMATION_TIMING {
  standard = "100ms"
}

export type ColorsStrings = keyof typeof Colors;

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export enum GENDER {
  male = "male",
  female = "female"
}

export enum ROUTES {
  ROOT = "/",
  LOGIN = "/login",
  REGISTRATION = "/register",
  DASHBOARD = "/dashboard",
  SETTINGS_PROFILE = "/settings/edit",
  SETTINGS_PASSWORD = "/settings/changePassword",
  DIRECT = "/direct",
  PUBLICATION = "/publication",
  EXPLORE = "/explore",
  LIKES = "/likes",
  PROFILE = "/profile"
}

export enum ClientVariables {
  HEADER_HEIGHT = 54
}
