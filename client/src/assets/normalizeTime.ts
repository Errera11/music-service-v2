export const normalizeTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60);
    const seconds = Math.floor(ms % 60);
    return `${minutes}:${seconds > 9 ? `${seconds}` : `0${seconds}`}`;
}