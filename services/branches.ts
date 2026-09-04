import branchesData from "@/mock/branches.json";

import type { Branch, NearbyBranch } from "@/types/branch";
import type { UserLocation } from "@/types/location";

const branches = branchesData as Branch[];

function calculateDistanceKm(
  from: UserLocation,
  to: Branch,
): number {

    {/* Syamee idh backend calculate cheyykkaan maximum nokk */}

    
  const earthRadiusKm = 6371;

  const latitudeDifference =
    ((to.latitude - from.latitude) * Math.PI) / 180;

  const longitudeDifference =
    ((to.longitude - from.longitude) * Math.PI) / 180;

  const fromLatitude =
    (from.latitude * Math.PI) / 180;

  const toLatitude =
    (to.latitude * Math.PI) / 180;

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function getNearbyBranches(
  location: UserLocation,
): NearbyBranch[] {
  return branches
    .map((branch) => ({
      ...branch,
      distance: calculateDistanceKm(location, branch),
    }))
    .sort((a, b) => a.distance - b.distance);
}