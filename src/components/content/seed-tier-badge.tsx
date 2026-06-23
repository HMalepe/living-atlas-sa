import { seedTierLabel } from "@/data/roads/johannesburg-mvp";
import type { SeedDataTier } from "@/domain/enums";
import { Badge } from "@/components/ui/badge";

type SeedTierBadgeProps = {
  tier: SeedDataTier;
};

export function SeedTierBadge({ tier }: SeedTierBadgeProps) {
  const variant = tier === "development_sample" ? "sample" : "muted";

  return (
    <Badge variant={variant} title={seedTierLabel(tier)}>
      {seedTierLabel(tier)}
    </Badge>
  );
}
