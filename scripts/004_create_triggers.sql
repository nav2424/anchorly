-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updating updated_at timestamps
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_focus_sessions_updated_at ON public.focus_sessions;
CREATE TRIGGER update_focus_sessions_updated_at
    BEFORE UPDATE ON public.focus_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_goals_updated_at ON public.goals;
CREATE TRIGGER update_goals_updated_at
    BEFORE UPDATE ON public.goals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_habits_updated_at ON public.habits;
CREATE TRIGGER update_habits_updated_at
    BEFORE UPDATE ON public.habits
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_analytics_summary_updated_at ON public.analytics_summary;
CREATE TRIGGER update_analytics_summary_updated_at
    BEFORE UPDATE ON public.analytics_summary
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for updating analytics on session completion
DROP TRIGGER IF EXISTS update_analytics_on_session ON public.focus_sessions;
CREATE TRIGGER update_analytics_on_session
    AFTER INSERT OR UPDATE ON public.focus_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_analytics_summary();
