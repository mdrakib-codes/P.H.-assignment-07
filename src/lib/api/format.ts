export function formatPrice(price?: number): string {
  return price === undefined
    ? "তথ্য পাওয়া যায়নি"
    : `৳${price.toLocaleString("bn-BD")}`;
}

export function formatUnit(unit?: string): string {
  if (!unit) return "তথ্য পাওয়া যায়নি";

  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
}
