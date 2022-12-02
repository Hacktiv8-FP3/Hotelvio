const replacer = (key: string, value: Date) =>
  value instanceof Date ? value.toISOString() : value;

const reviver = (key: string, value: string) =>
  typeof value === 'string' &&
  value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ? new Date(value)
    : value;

export const encode = (toDeshydrate: object) =>
  JSON.stringify(toDeshydrate, replacer);

export const decode = (toRehydrate: string) => JSON.parse(toRehydrate, reviver);
