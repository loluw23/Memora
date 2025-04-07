import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type SignUpCredentials = {
  email: string;
  password: string;
  username: string;
};

export type LoginCredentials = {
  identifier: string; // can be email or username
  password: string;
};

export const signUp = async ({ email, password, username }: SignUpCredentials) => {
  // First, check if the username already exists
  const { data: existingProfiles, error: profileError } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .limit(1);
  
  if (profileError) {
    throw new Error('Error checking username availability');
  }
  
  if (existingProfiles && existingProfiles.length > 0) {
    throw new Error('This username is already taken');
  }
  
  // Then sign up with Supabase auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  
  if (error) {
    // Handle specific error cases
    if (error.message?.includes('email already')) {
      throw new Error('This email is already registered');
    }
    throw error;
  }
  
  // The handle_new_user database trigger should create the profile
  // Return the created user data
  return data;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    // Try to sign in with a random password to check if email exists
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: "check_if_email_exists_" + Math.random().toString(),
    });
    
    // If there's an error about invalid login credentials, the email exists
    return error?.message?.includes("Invalid login credentials") || false;
  } catch (err) {
    return false; // Something went wrong, assume email doesn't exist
  }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('username', username);
  
  if (error) {
    throw error;
  }
  
  return count !== null && count > 0;
};

export const login = async ({ identifier, password }: LoginCredentials) => {
  // Check if the identifier is an email (contains @)
  const isEmail = identifier.includes('@');
  
  if (isEmail) {
    // Login with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } else {
    // Login with username
    // First, find the user's email by username
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', identifier);
    
    if (profileError) {
      throw new Error('Invalid username or password');
    }
    
    if (!profiles || profiles.length === 0) {
      throw new Error('Invalid username or password');
    }
    
    // Now that we have the user ID, we need to login with password
    // Since we can't directly query auth.users from the client,
    // we need to use the signInWithPassword method with email
    // TODO: In a production app, you might want to use a server-side function for this
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier, // This will fail if username is not an email
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const getCurrentUserWithProfile = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) {
    return null;
  }
  
  return {
    ...user,
    profile: data,
  };
};
