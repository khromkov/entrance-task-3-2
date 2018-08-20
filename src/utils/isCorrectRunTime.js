module.exports = (start, duration, mode) => {
  if (mode === 'day') {
    return start >= 7 && start + duration <= 21;
  }

  if (mode === 'night') {
    return (start >= 21 && start + duration <= 31) || (start <= 7 && start + duration <= 7);
  }

  return true;
};
