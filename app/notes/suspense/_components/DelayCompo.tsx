import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {
  delay: number;
};
const delayFetch = (time: number): Promise<any> => {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      const supabase = createClient();
      const { data: notes } = await supabase.from("notes").select();

      res(notes);
    }, time);
  });
};

export default async function DelayCompo({ delay }: Props) {
  const data = await delayFetch(delay);

  return (
    <div>
      {delay} : {data.length}
    </div>
  );
}
