const TIME_ZONE = "Asia/Kolkata";

export const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: TIME_ZONE });

export const formatDateTime = (value: string | Date | null) =>
  value
    ? new Date(value).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: TIME_ZONE })
    : "Never";

export const todayInIndia = () => new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE }); // YYYY-MM-DD
