import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://vjsfowlwcghxnnklprpu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjAzODI4MiwiZXhwIjoxOTQ3NjE0MjgyfQ.6W4YA-R6aa1-SIKVDfBNtJ9ZWoLdzAAIdDwWKoNA-no'
);