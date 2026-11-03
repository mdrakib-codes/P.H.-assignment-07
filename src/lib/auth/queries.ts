"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const authQueryKeys = {
  session: ["auth", "session"] as const,
};

async function getAuthSession() {
  const { data, error } = await authClient.getSession();
  if (error) throw new Error(error.message || "Could not load the session.");
  return data;
}

function throwAuthError(error: { message?: string } | null) {
  if (error) {
    throw new Error(error.message || "Authentication request failed.");
  }
}

export function useAuthSession() {
  return useQuery({
    queryKey: authQueryKeys.session,
    queryFn: getAuthSession,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const { data, error } = await authClient.signIn.email(input);
      throwAuthError(error);
      if (!data) throw new Error("Sign-in returned no session.");
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
    },
  });
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      name: string;
      email: string;
      password: string;
      callbackURL: string;
    }) => {
      const { data, error } = await authClient.signUp.email(input);
      throwAuthError(error);
      if (!data) throw new Error("Sign-up returned no session.");
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();
      throwAuthError(error);
    },
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.session, null);
    },
  });
}
