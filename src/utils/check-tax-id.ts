const logicMultipliers = [1, 2, 1, 2, 1, 2, 4, 1];

export const checkTaxId = (tax_id: string) => {
  const res = tax_id.split("").reduce((acc, char, i) => {
    const value = Number(char) * logicMultipliers[i];
    if (value > 9) {
      return acc + (value % 10) + Math.floor(value / 10);
    } else {
      return acc + value;
    }
  }, 0);
  return res % 5 === 0;
};
