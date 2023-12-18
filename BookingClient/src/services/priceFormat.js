const priceFormat = (value) => {
  const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
  return formattedValue;
};
export default priceFormat;
