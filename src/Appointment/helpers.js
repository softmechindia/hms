const NORMAL = "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
const ERROR = "border-red-500 ring-2 ring-red-200";

export const getFieldBorderClass = (errorField, field) =>
  errorField && errorField === field ? ERROR : NORMAL;