import { FilterSetting } from "utils/filters/settings";

export const parseSettingToStyle = (setting?: FilterSetting): string => {
  if (!setting) return "none";

  return Object.keys(setting)
    .map(
      (key): string =>
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${key}(${setting[key]}${
          // eslint-disable-next-line no-nested-ternary
          key === "hue-rotate" ? "deg" : key === "blur" ? "px" : ""
        })`
    )
    .join(" ");
};
