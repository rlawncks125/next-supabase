import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react";
import DelayCompo from "../suspense/_components/DelayCompo";

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <DelayCompo delay={1000} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <DelayCompo delay={2000} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <DelayCompo delay={3000} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <DelayCompo delay={4000} />
      </Suspense>
    </div>
  );
}
