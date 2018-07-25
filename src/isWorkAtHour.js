module.exports = (hour, offset, length) =>
  (hour >= 0 && hour < offset + length - 24) ||
  (offset <= hour && hour <= Math.min(offset + length, 23));
