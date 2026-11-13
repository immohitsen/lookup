'use server';

import { signIn, signOut } from '@/lib/auth';

/**
 * Server action to initiate Google OAuth sign-in.
 * This runs directly on the server and returns a 303 Redirect to Google,
 * avoiding fragile client-side fetches and working seamlessly across mobile browsers.
 */
export async function signInWithGoogle(redirectTo: string = '/app/home') {
  await signIn('google', { redirectTo });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

