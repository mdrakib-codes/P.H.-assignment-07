import { formatPrice } from "@/lib/api/format";

type PriceValueProps = {
  value?: number;
  className?: string;
};

export default function PriceValue({
  value,
  className = "",
}: PriceValueProps) {
  return <span className={className}>{formatPrice(value)}</span>;
}
