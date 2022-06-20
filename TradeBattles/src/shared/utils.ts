export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function getSortedRanks(members, battleId) {
  const sorted = [...members].sort(
    (a, b) =>
      b.current_gains_losses[battleId] - a.current_gains_losses[battleId],
  );
  return sorted;
}

export function getFormattedPL(member, battleId) {
  return formatter.format(
    member.current_gains_losses[String(battleId)]
      ? member.current_gains_losses[String(battleId)]
      : 0,
  );
}

export function getOrderEnding(pos: number) {
  const lastNumber = Number(String(pos)[String(pos).length - 1]);
  switch (lastNumber) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    case 4 || 5 || 6 || 7 || 8 || 9 || 0:
      return 'th';
    default:
      return 'th';
  }
}

export function subtractYears(numOfYears: number, date = new Date()) {
  date.setFullYear(date.getFullYear() - numOfYears);
  return date;
}
