"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import ReduxProvider from "@/app/redux/provider";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>{children}</ReduxProvider>
    </QueryClientProvider>
  );
}

export default Provider;
