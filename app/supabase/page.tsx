"use client";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const query = gql(
  `
   {
      notesCollection {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `
);

export default function Page() {
  const { loading, error, data } = useQuery(query);

  return (
    <div>
      <h1>supabase</h1>
      <p>Render :</p>
      <br />
      {data &&
        data.notesCollection.edges.map((v: any) => <div>{v.node.title}</div>)}
    </div>
  );
}
