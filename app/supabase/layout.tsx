"use client";
import apolloClient from "@/utils/GraphQL/apollo";
import { ApolloProvider } from "@apollo/client";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
