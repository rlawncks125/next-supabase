import React, { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </div>
  );
}
