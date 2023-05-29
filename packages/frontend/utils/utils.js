export const showPercentage = (value) =>
  `${parseFloat(value || 0).toFixed(3)}%`;

export const showQuantity = (value) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const showPrice = (value) =>
  `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getDate = () => new Date().toISOString();
