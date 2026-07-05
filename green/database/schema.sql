CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE ai_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT CHECK (
    type IN (
      'diagnostic',
      'recommendations',
      'swot',
      'pitch',
      'business-plan',
      'bmc-review',
      'next-steps'
    )
  ),
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('success', 'error')),
  created_at TIMESTAMP DEFAULT NOW()
);
