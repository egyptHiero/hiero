export const wrapWithBrackets = (text = '') => {
  return text?.trim() ? `[${text.replace(/[[\]]/g, '')}]` : '';
};
