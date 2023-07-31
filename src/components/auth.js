import { GoTrueClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://vgigltsnmhcxllawoozp.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWdsdHNubWhjeGxsYXdvb3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NzA3OTYsImV4cCI6MjAwNTQ0Njc5Nn0.wmh_PVPtPxEuxYwGbmeN-gRWhXUTGR9Koh_9f5PN3Kk";

const auth = new GoTrueClient({
  url: SUPABASE_PROJECT_URL, 
  ...SUPABASE_API_KEY});

export default auth;