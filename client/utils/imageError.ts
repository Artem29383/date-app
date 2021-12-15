import React from "react";

import imagePlaceholder from "assets/backgrounds/placeholder.png";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder.src;
};
