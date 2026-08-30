import { Suspense } from "react";

import ForgotPasswordVerification from "@/components/Auth/ForgotPasswordVerification";

export default function ForgotPasswordVerifyPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordVerification />
    </Suspense>
  );
}