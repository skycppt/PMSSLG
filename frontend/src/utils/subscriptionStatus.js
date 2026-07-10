export const getSubscriptionStatus = (sub) => {
  if (sub.status === "Cancelled") {
    return "Cancelled";
  }

  const today = new Date();
  const end = new Date(sub.endDate);

  if (end < today) {
    return "Expired";
  }

  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  if (end <= oneMonthLater) {
    return "Expiring Soon";
  }

  return "Active";
};