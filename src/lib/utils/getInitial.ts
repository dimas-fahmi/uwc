export const getInitial = (string?: string) => {
  if (!string?.trim()) {
    return "N/A";
  }
  const splitted = string.trim().split(" ");
  return `${splitted[0].at(0)}${splitted.length > 1 ? splitted[splitted.length - 1].at(0) : ""}`;
};
