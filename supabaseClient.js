import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://efvogthxaoisrjabhale.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdm9ndGh4YW9pc3JqYWJoYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODYxMzAsImV4cCI6MjA2OTQ2MjEzMH0.7s_yBDAy0jdDLZV-5PL7LtuBj-aLAy8WP9SbTG2pETA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)