import { createClient } from "@supabase/supabase-js";

// Type declarations for environment variables
declare global {
    interface ImportMetaEnv {
        readonly SUPABASE_URL: string;
        readonly SUPABASE_SERVICE_ROLE_KEY: string;
        readonly OURA_API_KEY: string;
        readonly OURA_TABLE_NAME: string;
    }
}

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const OURA_API_KEY = import.meta.env.OURA_API_KEY;
const OURA_TABLE_NAME = import.meta.env.OURA_TABLE_NAME;

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface HealthCardProps {
    type: "stamina" | "sleep" | "motion";
}

// Fetch the last row from the table, ordered by created_at in descending order
const { data, error } = await supabase
    .from(OURA_TABLE_NAME)
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

// Type definition for our health data
interface HealthData {
    updated: {
        date: string;
        time: string;
        timestamp: string;
    };
    staminaScore: number;
    sleepScore: number;
    motionScore: number;
}

// Initialize with null instead of empty object for better type checking
let healthData: HealthData | null = null;

if (data && data.length > 0) {
    // Extract date string from the created_at timestamp which is already in PST
    const timestamp = data[0].created_at;
    // Format the date without changing the timezone
    const date = new Date(timestamp);

    // Format month, day, year
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // Format time with AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    // Format date and time separately
    const formattedDate = `${month}.${day}.${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm} PST`;
    const formattedTimestamp = `${formattedDate} • ${formattedTime}`;

    healthData = {
        updated: {
            date: formattedDate,
            time: formattedTime,
            timestamp: formattedTimestamp,
        },
        staminaScore: data[0]?.stamina?.data?.[0]?.score,
        sleepScore: data[0]?.sleep?.data?.[0]?.score,
        motionScore: data[0]?.motion?.data?.[0]?.score,
    };
}

const LoadingData = () => {
    return <>loading…</>;
};

const Stamina = () => {
    return <LoadingData />;
};

const HealthCard = ({ type }: HealthCardProps) => {
    const percent = 50;
    const status = "balanced";
    return <>{data}</>;
};

export const HealthSummary = () => {
    if (error) {
        return (
            <div className="health-summary error">
                Failed to load health data
            </div>
        );
    }

    if (!healthData) {
        return (
            <div className="health-summary loading">
                <LoadingData />
            </div>
        );
    }

    return (
        <div className="health-summary">
            <h2>Health Summary</h2>
            <div className="metrics">
                <div className="metric-card">
                    <h3>Stamina</h3>
                    <div className="score">
                        Score: {healthData.staminaScore}%
                    </div>
                </div>

                <div className="metric-card">
                    <h3>Sleep</h3>
                    <div className="score">Score: {healthData.sleepScore}%</div>
                </div>

                <div className="metric-card">
                    <h3>Motion</h3>
                    <div className="score">
                        Score: {healthData.motionScore}%
                    </div>
                </div>
            </div>
            <hr />
            <div className="last-updated">
                <time>{healthData.updated.date}</time>
                <span> • </span>
                <time>{healthData.updated.time}</time>
            </div>
        </div>
    );
};
