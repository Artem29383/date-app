/**
 *
 * Returns an x,y point once rotated around xMid,yMid
 */
export function rotateAroundMidPoint(
  x: number,
  y: number,
  xMid: number,
  yMid: number,
  degrees: number
): [number, number] {
  const { cos } = Math;
  const { sin } = Math;
  const radian = (degrees * Math.PI) / 180; // Convert to radians
  // Subtract midpoints, so that midpoint is translated to origin
  // and add it in the end again
  const xr = (x - xMid) * cos(radian) - (y - yMid) * sin(radian) + xMid;
  const yr = (x - xMid) * sin(radian) + (y - yMid) * cos(radian) + yMid;

  return [xr, yr];
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function translateSize(
  width: number,
  height: number,
  rotation: number
): Size {
  const centerX = width / 2;
  const centerY = height / 2;

  const outerBounds = [
    rotateAroundMidPoint(0, 0, centerX, centerY, rotation),
    rotateAroundMidPoint(width, 0, centerX, centerY, rotation),
    rotateAroundMidPoint(width, height, centerX, centerY, rotation),
    rotateAroundMidPoint(0, height, centerX, centerY, rotation)
  ];

  const minX = Math.min(...outerBounds.map(p => p[0]));
  const maxX = Math.max(...outerBounds.map(p => p[0]));
  const minY = Math.min(...outerBounds.map(p => p[1]));
  const maxY = Math.max(...outerBounds.map(p => p[1]));

  return { width: maxX - minX, height: maxY - minY };
}

/**
 * Compute the dimension of the crop area based on media size,
 * aspect ratio and optionally rotation
 */
export function getCropSize(
  mediaWidth: number,
  mediaHeight: number,
  containerWidth: number,
  containerHeight: number,
  aspect: number,
  rotation = 0
): Size {
  const { width, height } = translateSize(mediaWidth, mediaHeight, rotation);
  const fittingWidth = Math.min(width, containerWidth);
  const fittingHeight = Math.min(height, containerHeight);

  if (fittingWidth > fittingHeight * aspect) {
    return {
      width: fittingHeight * aspect,
      height: fittingHeight
    };
  }

  return {
    width: fittingWidth,
    height: fittingWidth / aspect
  };
}
