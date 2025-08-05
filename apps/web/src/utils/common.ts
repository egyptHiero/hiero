export const countHieroes = (hieroes = '') => {
  return (hieroes.match(/-/g) || []).length + 1;
};
