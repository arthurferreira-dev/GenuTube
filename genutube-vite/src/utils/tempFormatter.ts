export const TempFormatter = (seconds: number) => {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRes = seconds % 60;

  const minutesStr =
    hours > 0 ? minutes.toString().padStart(2, "0") : minutes.toString();
  const secondsStr = secondsRes.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
};