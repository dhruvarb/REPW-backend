-- Run this SQL in your Supabase SQL Editor

CREATE TABLE public.properties (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    location_lat NUMERIC,
    location_lng NUMERIC,
    house_type VARCHAR(50) CHECK (house_type IN ('sale', 'rent')),
    property_type VARCHAR(50) CHECK (property_type IN ('empty land', 'villa', 'flat', 'farm house')),
    contact_details VARCHAR(255),
    image_url TEXT,
    owner_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) if needed, for now we will keep it simple.
-- ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all actions" ON public.properties FOR ALL USING (true);

-- IF YOU ALREADY CREATED THE TABLE, RUN THIS:
-- ALTER TABLE public.properties ADD COLUMN property_type VARCHAR(50) CHECK (property_type IN ('empty land', 'villa', 'flat', 'farm house'));

