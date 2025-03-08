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
    .order("created_at", { ascending: false })
    .limit(1);

let healthData = {};

if (data) {
    healthData = {
        updated: new Date(data[0].created_at),
        staminaScore: data[0].stamina.data[0].score,
        sleepScore: data[0].sleep.data[0].score,
        motionScore: data[0].motion.data[0].score,
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
    return (
        <>
            <div>
                <h2>Stamina</h2>
                <div>Stamina score is {healthData.staminaScore}%</div>
            </div>
            <div>
                <h2>Sleep</h2>
                <div>Sleep score is {healthData.sleepScore}%</div>
            </div>
            <div>
                <h2>Motion</h2>
                <div>Motion score is {healthData.motionScore}%</div>
            </div>
            <div>updated {JSON.stringify(healthData.updated)}</div>
        </>
    );
};
