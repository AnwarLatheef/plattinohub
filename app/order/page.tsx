import ShopPage from "@/components/Shop/ShopPage";
import OrderModeGate from "@/components/OrderMode/OrderModeGate";
import DineInSetup from "@/components/OrderMode/DineInSetup";

import type { OrderMode } from "@/types/order";

interface OrderPageProps {
  searchParams: Promise<{
    mode?: string;
    branchId?: string;
  }>;
}

const validModes: OrderMode[] = [
  "dine_in",
  "takeaway",
  "delivery",
];

export default async function OrderPage({
  searchParams,
}: OrderPageProps) {
  const { mode, branchId  } = await searchParams;

  if (!mode || !validModes.includes(mode as OrderMode)) {
    return <OrderModeGate />;
  }

  if (mode === "dine_in") {
  if (!branchId) {
    return <DineInSetup />;
  }

  return <ShopPage branchId={branchId} />;
}

  return <ShopPage />;
}