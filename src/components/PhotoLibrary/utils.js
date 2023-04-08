export const sanitizeUri = (uri) => {
  let result = uri;
  if (uri.startsWith('ph://')) {
    result = `ph-upload${uri.substring(2)}`;
  }
  return result;
};
