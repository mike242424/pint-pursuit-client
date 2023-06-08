export const formatPhoneNumber = (number) => {
  const formattedNumber = String(number).replace(/\D/g, "");
  const match = formattedNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return formattedNumber;
};
