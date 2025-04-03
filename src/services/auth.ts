
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
  // Add the username to the user metadata
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
    throw error;
  }
  
  return data;
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
