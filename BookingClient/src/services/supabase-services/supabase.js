import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient('https://onixmfqqaugazfixqbjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uaXhtZnFxYXVnYXpmaXhxYmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMjU2NjIsImV4cCI6MjAxNzYwMTY2Mn0.Tc7WzexWs8LomcR1RM7Xeag3OD6A-iLT9hyzmftIn4I')
export default supabase