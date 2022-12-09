export const dateTime = (date: Date) => {
    const milliSeconds = Number(new Date()) - Number(date);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const dateString = date.toLocaleDateString();
    return dateString;
};
