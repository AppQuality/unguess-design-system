export const formatDuration = (durationInSeconds: number) => {
  const min = Math.floor(durationInSeconds / 60);
  const sec = Math.floor(durationInSeconds - min * 60);

  const minutes = `${min}`.padStart(2, "0");
  const seconds = `${sec}`.padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export const getNextPlaybackRate = (rate: number = 1) => {
  switch (rate) {
    case .5:
      return 1;
    case 1:
      return 1.5;
    case 1.5:
      return 2;
    case 2:
      return .5;
    default:
      return 1;
  }
};
