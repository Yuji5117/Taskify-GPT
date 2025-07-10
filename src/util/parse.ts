export const extractJsonFromCodeBlock = (raw: string): string => {
  return raw
    .replace(/^```json\s*/i, "")
    .replace(/```$/, "")
    .trim();
};
