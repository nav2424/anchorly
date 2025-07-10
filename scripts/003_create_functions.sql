-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    
    -- Create welcome notification
    INSERT INTO public.notifications (user_id, title, message, type)
    VALUES (
        NEW.id,
        'Welcome to Anchorly.ai!',
        'Your cognitive workspace is ready. Start your first focus session to begin tracking your productivity.',
        'success'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user productivity stats
CREATE OR REPLACE FUNCTION public.get_user_productivity_stats(user_uuid UUID, days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    total_sessions INTEGER,
    total_minutes INTEGER,
    average_focus_score DECIMAL,
    completion_rate DECIMAL,
    current_streak INTEGER,
    best_streak INTEGER,
    average_mood DECIMAL,
    average_energy DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    WITH session_stats AS (
        SELECT 
            COUNT(*) as sessions,
            SUM(completed_minutes) as minutes,
            AVG(focus_score) as avg_score,
            AVG(CASE WHEN status = 'completed' THEN 1.0 ELSE 0.0 END) as completion,
            AVG(mood_after) as avg_mood,
            AVG(energy_after) as avg_energy
        FROM public.focus_sessions 
        WHERE user_id = user_uuid 
        AND created_at >= NOW() - INTERVAL '1 day' * days_back
    ),
    streak_calc AS (
        SELECT 
            public.calculate_focus_streak(user_uuid) as current,
            public.calculate_best_streak(user_uuid) as best
    )
    SELECT 
        COALESCE(s.sessions, 0)::INTEGER,
        COALESCE(s.minutes, 0)::INTEGER,
        ROUND(COALESCE(s.avg_score, 0), 2),
        ROUND(COALESCE(s.completion, 0) * 100, 1),
        COALESCE(st.current, 0)::INTEGER,
        COALESCE(st.best, 0)::INTEGER,
        ROUND(COALESCE(s.avg_mood, 0), 2),
        ROUND(COALESCE(s.avg_energy, 0), 2)
    FROM session_stats s
    CROSS JOIN streak_calc st;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate current focus streak
CREATE OR REPLACE FUNCTION public.calculate_focus_streak(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    streak INTEGER := 0;
    check_date DATE := CURRENT_DATE;
    has_session BOOLEAN;
BEGIN
    LOOP
        SELECT EXISTS(
            SELECT 1 FROM public.focus_sessions 
            WHERE user_id = user_uuid 
            AND DATE(created_at) = check_date 
            AND status = 'completed'
        ) INTO has_session;
        
        IF NOT has_session THEN
            EXIT;
        END IF;
        
        streak := streak + 1;
        check_date := check_date - INTERVAL '1 day';
    END LOOP;
    
    RETURN streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate best focus streak
CREATE OR REPLACE FUNCTION public.calculate_best_streak(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    best_streak INTEGER := 0;
    current_streak INTEGER := 0;
    session_date DATE;
    prev_date DATE;
    session_cursor CURSOR FOR 
        SELECT DISTINCT DATE(created_at) as session_date
        FROM public.focus_sessions 
        WHERE user_id = user_uuid AND status = 'completed'
        ORDER BY session_date;
BEGIN
    prev_date := NULL;
    
    FOR session_record IN session_cursor LOOP
        session_date := session_record.session_date;
        
        IF prev_date IS NULL OR session_date = prev_date + INTERVAL '1 day' THEN
            current_streak := current_streak + 1;
        ELSE
            current_streak := 1;
        END IF;
        
        IF current_streak > best_streak THEN
            best_streak := current_streak;
        END IF;
        
        prev_date := session_date;
    END LOOP;
    
    RETURN best_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update analytics summary
CREATE OR REPLACE FUNCTION public.update_analytics_summary()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.analytics_summary (
        user_id, 
        date, 
        total_focus_minutes, 
        completed_sessions, 
        average_focus_score
    )
    VALUES (
        NEW.user_id,
        DATE(NEW.created_at),
        NEW.completed_minutes,
        CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
        NEW.focus_score
    )
    ON CONFLICT (user_id, date) 
    DO UPDATE SET
        total_focus_minutes = analytics_summary.total_focus_minutes + NEW.completed_minutes,
        completed_sessions = analytics_summary.completed_sessions + CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
        average_focus_score = (analytics_summary.average_focus_score * analytics_summary.completed_sessions + COALESCE(NEW.focus_score, 0)) / (analytics_summary.completed_sessions + 1),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
