-- Create demo user data (run this AFTER creating the demo user account)
-- First sign up with email: demo@anchorly.ai and password: demo123456
-- Then run this script to populate demo data

DO $$
DECLARE
    demo_user_id UUID;
    session_id UUID;
    habit_id UUID;
BEGIN
    -- Get the demo user ID
    SELECT id INTO demo_user_id 
    FROM auth.users 
    WHERE email = 'demo@anchorly.ai';
    
    -- Only proceed if demo user exists
    IF demo_user_id IS NOT NULL THEN
        
        -- Update demo user profile
        UPDATE public.profiles 
        SET 
            full_name = 'Demo User',
            onboarding_completed = true,
            focus_goal_daily = 6,
            focus_goal_weekly = 30,
            preferred_session_duration = 25
        WHERE id = demo_user_id;
        
        -- Insert sample focus sessions
        INSERT INTO public.focus_sessions (user_id, title, description, duration_minutes, completed_minutes, status, focus_score, mood_before, mood_after, energy_before, energy_after, tags, notes, started_at, completed_at, created_at) VALUES
        (demo_user_id, 'Morning Deep Work', 'Working on project proposal', 25, 25, 'completed', 8, 3, 4, 3, 4, ARRAY['work', 'deep-work'], 'Great focus session!', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 35 minutes', NOW() - INTERVAL '2 hours'),
        (demo_user_id, 'Email Processing', 'Clearing inbox and responding to emails', 15, 15, 'completed', 6, 4, 3, 4, 3, ARRAY['email', 'admin'], 'Lots of distractions', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '3 hours 45 minutes', NOW() - INTERVAL '4 hours'),
        (demo_user_id, 'Creative Writing', 'Blog post draft', 30, 22, 'completed', 9, 4, 5, 4, 5, ARRAY['writing', 'creative'], 'In the zone!', NOW() - INTERVAL '1 day 3 hours', NOW() - INTERVAL '1 day 2 hours 38 minutes', NOW() - INTERVAL '1 day 3 hours'),
        (demo_user_id, 'Code Review', 'Reviewing team pull requests', 20, 20, 'completed', 7, 3, 4, 3, 4, ARRAY['code', 'review'], 'Good progress', NOW() - INTERVAL '1 day 5 hours', NOW() - INTERVAL '1 day 4 hours 40 minutes', NOW() - INTERVAL '1 day 5 hours'),
        (demo_user_id, 'Learning Session', 'React advanced patterns', 45, 35, 'completed', 8, 4, 4, 4, 3, ARRAY['learning', 'react'], 'Complex but rewarding', NOW() - INTERVAL '2 days 2 hours', NOW() - INTERVAL '2 days 1 hour 25 minutes', NOW() - INTERVAL '2 days 2 hours');
        
        -- Insert mood entries
        INSERT INTO public.mood_entries (user_id, date, mood, energy, stress, sleep_hours, sleep_quality, notes) VALUES
        (demo_user_id, CURRENT_DATE, 4, 4, 2, 7.5, 4, 'Feeling productive today'),
        (demo_user_id, CURRENT_DATE - INTERVAL '1 day', 3, 3, 3, 6.5, 3, 'Bit tired but okay'),
        (demo_user_id, CURRENT_DATE - INTERVAL '2 days', 5, 5, 1, 8.0, 5, 'Excellent day!'),
        (demo_user_id, CURRENT_DATE - INTERVAL '3 days', 3, 2, 4, 5.5, 2, 'Stressful day at work'),
        (demo_user_id, CURRENT_DATE - INTERVAL '4 days', 4, 4, 2, 7.0, 4, 'Good balance');
        
        -- Insert goals
        INSERT INTO public.goals (user_id, title, description, goal_type, target_value, current_value, unit, start_date, end_date, status, priority, color) VALUES
        (demo_user_id, 'Daily Focus Goal', 'Complete 6 focus sessions per day', 'daily', 6, 2, 'sessions', CURRENT_DATE, CURRENT_DATE, 'active', 1, '#8b5cf6'),
        (demo_user_id, 'Weekly Deep Work', 'Accumulate 10 hours of deep work weekly', 'weekly', 600, 180, 'minutes', CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, 'active', 2, '#06b6d4'),
        (demo_user_id, 'Monthly Learning', 'Spend 20 hours learning new skills', 'monthly', 1200, 350, 'minutes', DATE_TRUNC('month', CURRENT_DATE)::DATE, (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE, 'active', 3, '#10b981');
        
        -- Insert habits
        INSERT INTO public.habits (user_id, name, description, frequency, target_value, unit, color, icon) VALUES
        (demo_user_id, 'Morning Meditation', 'Start the day with 10 minutes of meditation', 'daily', 1, 'times', '#8b5cf6', 'brain'),
        (demo_user_id, 'Exercise', 'Physical activity for at least 30 minutes', 'daily', 1, 'times', '#ef4444', 'activity'),
        (demo_user_id, 'Reading', 'Read for personal development', 'daily', 1, 'times', '#f59e0b', 'book'),
        (demo_user_id, 'Gratitude Journal', 'Write down 3 things I am grateful for', 'daily', 1, 'times', '#10b981', 'heart');
        
        -- Get habit IDs and insert habit entries
        FOR habit_id IN SELECT id FROM public.habits WHERE user_id = demo_user_id LOOP
            INSERT INTO public.habit_entries (user_id, habit_id, date, completed, value) VALUES
            (demo_user_id, habit_id, CURRENT_DATE, true, 1),
            (demo_user_id, habit_id, CURRENT_DATE - INTERVAL '1 day', true, 1),
            (demo_user_id, habit_id, CURRENT_DATE - INTERVAL '2 days', false, 0);
        END LOOP;
        
        -- Insert additional notifications
        INSERT INTO public.notifications (user_id, title, message, type, read) VALUES
        (demo_user_id, 'Great Focus Streak!', 'You have completed focus sessions for 3 days in a row. Keep it up!', 'success', false),
        (demo_user_id, 'Weekly Goal Progress', 'You are 60% towards your weekly deep work goal. You can do it!', 'info', false),
        (demo_user_id, 'Habit Reminder', 'Don''t forget to complete your daily meditation habit.', 'warning', true);
        
        RAISE NOTICE 'Demo data created successfully for user: %', demo_user_id;
    ELSE
        RAISE NOTICE 'Demo user not found. Please create account with email: demo@anchorly.ai first.';
    END IF;
END $$;
