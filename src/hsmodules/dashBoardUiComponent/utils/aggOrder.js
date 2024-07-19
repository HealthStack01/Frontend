export const calculateTotalRevenuePresent = (data) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
  
    let revenueDay = 0;
    let revenueWeek = 0;
    let revenueMonth = 0;
    let revenueYear = 0;
  
    data.forEach(item => {
      const amount = parseFloat(item.amount) || 0;
      const createdAt = new Date(item.createdAt);
  
      if (createdAt >= startOfDay) {
        revenueDay += amount;
      }
      if (createdAt >= startOfWeek) {
        revenueWeek += amount;
      }
      if (createdAt >= startOfMonth) {
        revenueMonth += amount;
      }
      if (createdAt >= startOfYear) {
        revenueYear += amount;
      }
    });
  
    return {
      revenueDay,
      revenueWeek,
      revenueMonth,
      revenueYear
    };
  };