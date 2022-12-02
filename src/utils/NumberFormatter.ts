import numeral from 'numeral';

numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'rb',
    million: 'jt',
    billion: 'm',
    trillion: 't',
  },
  ordinal: () => {
    return '';
  },
  currency: {
    symbol: 'Rp',
  },
});
numeral.locale('id');

const thousandAndDecimalSeparator = (value: number | string) => {
  const number = numeral(Number(value));
  return number.format('$0,0');
};

export default thousandAndDecimalSeparator;

export function isNumeric(value: number | string) {
  return !Number.isNaN(Number(value));
}
