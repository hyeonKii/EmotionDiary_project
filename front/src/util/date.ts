const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const dayAgo = new Date(year, month, day - 7);
const aMonthAgo = new Date(year, month - 1, day);
const aYearAgo = new Date(year - 1, month, day);

const dayString = dayAgo.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});
const monthString = aMonthAgo.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});
const yearString = aYearAgo.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export { dayAgo, aMonthAgo, aYearAgo, dayString, monthString, yearString };
