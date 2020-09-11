export const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
    value,
  );

export const formatDocument = (value: string): string => {
  const regex = /\./gi;
  const document = value.replace(regex, '');

  if (document.length > 11) {
    return value.substr(1);
  }

  return value;
};

export const formatDate = (value: string): string => {
  const regex = /\-/gi;
  return value.replace(regex, '/');
};
