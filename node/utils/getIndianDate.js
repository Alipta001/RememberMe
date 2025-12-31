module.exports.getIndianDate = () => {
  const now = new Date();

  // IST offset = +5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);

  return istDate.toISOString().split("T")[0]; // YYYY-MM-DD
};
