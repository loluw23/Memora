
// This is a helper script to guide you on disabling email verification in Supabase
// You'll need to manually update these settings in the Supabase dashboard

console.log(`
To disable email verification in Supabase:

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/zmkbhaqphvxtsvhmpsls
2. Navigate to Authentication > Email Templates
3. Under "Confirm signup" template, toggle "Enable email confirmations" to OFF
4. Navigate to Authentication > Providers
5. Under "Email" provider, make sure "Confirm email" is turned OFF

This will allow users to sign up and log in immediately without email verification.
`);
