-- Insert demo user profile (this will be created automatically by the trigger)
-- But we can update it with additional demo data

-- Demo focus sessions for the demo user
INSERT INTO public.focus_sessions (
    user_id,
    title,
    description,
    duration_minutes,
    actual_duration_minutes,
    completed,
    focus_score,
    session_type,
    tags,
    started_at,
    completed_at,
    created_at
) VALUES 
-- Recent completed sessions
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Morning Deep Work',
    'Working on project documentation and planning',
    25,
    25,
    true,
    8,
    'focus',
    ARRAY['work', 'documentation'],
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '1 hour 35 minutes',
    NOW() - INTERVAL '2 hours'
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Code Review Session',
    'Reviewing pull requests and providing feedback',
    25,
    23,
    true,
    9,
    'focus',
    ARRAY['code', 'review'],
    NOW() - INTERVAL '4 hours',
    NOW() - INTERVAL '3 hours 37 minutes',
    NOW() - INTERVAL '4 hours'
),
-- Yesterday's sessions
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Design System Work',
    'Creating new components for the design system',
    25,
    25,
    true,
    7,
    'focus',
    ARRAY['design', 'components'],
    NOW() - INTERVAL '1 day 3 hours',
    NOW() - INTERVAL '1 day 2 hours 35 minutes',
    NOW() - INTERVAL '1 day 3 hours'
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Team Meeting Prep',
    'Preparing agenda and materials for team standup',
    15,
    18,
    true,
    6,
    'focus',
    ARRAY['meeting', 'preparation'],
    NOW() - INTERVAL '1 day 5 hours',
    NOW() - INTERVAL '1 day 4 hours 42 minutes',
    NOW() - INTERVAL '1 day 5 hours'
);

-- Demo mood entries
INSERT INTO public.mood_entries (
    user_id,
    mood_score,
    energy_level,
    stress_level,
    notes,
    factors,
    created_at
) VALUES 
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    8,
    7,
    3,
    'Feeling productive and focused today. Good coffee helped!',
    ARRAY['coffee', 'good_sleep', 'clear_goals'],
    NOW() - INTERVAL '1 hour'
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    7,
    6,
    4,
    'Slightly tired but maintaining good focus',
    ARRAY['afternoon_dip', 'completed_tasks'],
    NOW() - INTERVAL '1 day 2 hours'
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    9,
    8,
    2,
    'Excellent day! Completed all planned tasks',
    ARRAY['exercise', 'good_sleep', 'accomplished_goals'],
    NOW() - INTERVAL '2 days 1 hour'
);

-- Demo goals
INSERT INTO public.goals (
    user_id,
    title,
    description,
    target_value,
    current_value,
    unit,
    goal_type,
    start_date,
    end_date,
    completed
) VALUES 
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Daily Focus Time',
    'Complete 2 hours of focused work each day',
    120,
    73,
    'minutes',
    'daily',
    CURRENT_DATE,
    CURRENT_DATE,
    false
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Weekly Deep Work',
    'Complete 10 hours of deep work this week',
    600,
    285,
    'minutes',
    'weekly',
    CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER,
    CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6,
    false
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Monthly Productivity',
    'Complete 50 focus sessions this month',
    50,
    23,
    'sessions',
    'monthly',
    DATE_TRUNC('month', CURRENT_DATE)::DATE,
    (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE,
    false
);

-- Demo habits
INSERT INTO public.habits (
    user_id,
    name,
    description,
    frequency,
    target_count,
    color,
    icon,
    active
) VALUES 
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Morning Meditation',
    'Start the day with 10 minutes of mindfulness',
    'daily',
    1,
    '#10B981',
    'brain',
    true
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Deep Work Block',
    'Complete at least one 25-minute focus session',
    'daily',
    1,
    '#3B82F6',
    'target',
    true
),
(
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    'Exercise',
    'Get some physical activity',
    'daily',
    1,
    '#EF4444',
    'activity',
    true
);

-- Demo habit entries
INSERT INTO public.habit_entries (
    habit_id,
    user_id,
    completed,
    notes,
    date
) VALUES 
-- Today's habits
(
    (SELECT id FROM public.habits WHERE name = 'Morning Meditation' AND user_id = (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1) LIMIT 1),
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    true,
    'Great session, feeling centered',
    CURRENT_DATE
),
(
    (SELECT id FROM public.habits WHERE name = 'Deep Work Block' AND user_id = (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1) LIMIT 1),
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    true,
    'Completed morning focus session',
    CURRENT_DATE
),
-- Yesterday's habits
(
    (SELECT id FROM public.habits WHERE name = 'Morning Meditation' AND user_id = (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1) LIMIT 1),
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    true,
    'Quick but effective session',
    CURRENT_DATE - 1
),
(
    (SELECT id FROM public.habits WHERE name = 'Deep Work Block' AND user_id = (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1) LIMIT 1),
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    true,
    'Good focus on design work',
    CURRENT_DATE - 1
),
(
    (SELECT id FROM public.habits WHERE name = 'Exercise' AND user_id = (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1) LIMIT 1),
    (SELECT id FROM auth.users WHERE email = 'demo@anchorly.ai' LIMIT 1),
    true,
    '30 minute walk',
    CURRENT_DATE - 1
);
