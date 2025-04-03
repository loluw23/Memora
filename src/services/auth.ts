
import { supabase } from "@/integrations/supabase/client";

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
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', identifier)
      .single();
    
    if (profileError) {
      throw new Error('Invalid username or password');
    }
    
    // Then use the user ID to find the email
    const { data: userData, error: userError } = await supabase.auth
      .admin.getUserById(profileData.id);
    
    if (userError || !userData.user) {
      throw new Error('Invalid username or password');
    }
    
    // Finally, sign in with the email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.user.email || '',
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
