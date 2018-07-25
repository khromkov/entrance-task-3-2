module.exports = (hour, offset, duration) =>
  (hour >= 0 && hour < offset + duration - 24) ||
  (offset <= hour && hour < Math.min(offset + duration, 24));
