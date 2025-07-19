-- Create the onboarding_applications table
CREATE TABLE IF NOT EXISTS onboarding_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    form_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_onboarding_applications_user_id ON onboarding_applications(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_onboarding_applications_created_at ON onboarding_applications(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE onboarding_applications ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to only see their own applications
CREATE POLICY "Users can view their own onboarding applications" ON onboarding_applications
    FOR SELECT USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own applications
CREATE POLICY "Users can insert their own onboarding applications" ON onboarding_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update their own applications
CREATE POLICY "Users can update their own onboarding applications" ON onboarding_applications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_onboarding_applications_updated_at 
    BEFORE UPDATE ON onboarding_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 