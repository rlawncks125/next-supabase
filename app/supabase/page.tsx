"use client";
import {
  FirstTestQuery,
  InsertNoteMutation,
  InsertNoteMutationVariables,
  NotesInsertInput,
  OneNoteQuery,
  OneNoteQueryVariables,
} from "@/utils/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const QUERY_ALL_NOTES = gql(
  `
   query firstTest {
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

const QUERY_ONE_NOTE = gql(`
query oneNote($id: BigInt!) {
  notesCollection (
    filter:{
      id : {
        eq : $id
      }
    }
  ) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`);

const MUTATION_INSERT_NOTE = gql(`
mutation insertNote($title : String!){
  insertIntonotesCollection(objects:{
    title : $title
  }){
    affectedCount
  }
}
`);

export default function Page() {
  // Query
  const { loading, error, data, refetch } =
    useQuery<FirstTestQuery>(QUERY_ALL_NOTES);

  const { data: oneData } = useQuery<OneNoteQuery, OneNoteQueryVariables>(
    QUERY_ONE_NOTE,
    {
      variables: {
        id: "3",
      },
    }
  );

  // Mutation
  const [mutation, { data: mutationData }] = useMutation<
    InsertNoteMutation,
    InsertNoteMutationVariables
  >(MUTATION_INSERT_NOTE);

  // 확인용 트리거
  const [text, setText] = useState<string>("");

  const onClickNewNote = async () => {
    if (text === "") return;

    const { data } = await mutation({
      variables: {
        title: text,
      },
    });

    if (data?.insertIntonotesCollection?.affectedCount === 1) {
      setText("");
      refetch();
    }
  };

  return (
    <div>
      <h1>supabase</h1>
      <div>
        <input
          onChange={(e) => setText(e.currentTarget.value)}
          value={text}
          className="border"
          type="text"
          placeholder="추가할 텍스트를 입력하세요"
        />
        <button onClick={onClickNewNote}>추가</button>
      </div>
      <p>Render :</p>
      <br />
      {data &&
        data.notesCollection?.edges.map((v, index) => (
          <div key={index}>{v.node.title}</div>
        ))}

      <br />
      <p>first data : </p>
      {oneData &&
        oneData.notesCollection?.edges.length! > 0 &&
        oneData.notesCollection?.edges[0].node.title}
    </div>
  );
}
