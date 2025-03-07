import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OURA_API_KEY = process.env.OURA_API_KEY;
const OURA_TABLE_NAME = process.env.OURA_TABLE_NAME;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Produces a date like "2024-06-28T18:48:17.740"
export const newPstDate = () => {
  const date = new Date();
  // const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const pstOffset = 8 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() - pstOffset);
  const localISOString = localDate.toISOString().slice(0, -1); // Remove the 'Z' at the end
  return localISOString.split("T")[0];
};

const getOura = async (type) => {
  const startDate = newPstDate();

  let typeArg = "";

  switch (type) {
    case "motion":
      typeArg = `daily_activity?start_date=${startDate}`;
      break;
    case "sleep":
      typeArg = `daily_sleep?start_date=${startDate}`;
      break;
    case "stamina":
      typeArg = `daily_readiness?start_date=${startDate}`;
  }

  const baseUrl = `https://api.ouraring.com/v2/usercollection/${typeArg}`;

  const myHeaders = new Headers();

  myHeaders.append("Authorization", `Bearer ${OURA_API_KEY}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(baseUrl, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error('Network response was not ok');
    }

    const healthData = await response.json();

    return healthData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Helper function to check if Oura data is empty
const isOuraDataEmpty = (ouraResponse) => {
  return (
    !ouraResponse || 
    !ouraResponse.data || 
    ouraResponse.data.length === 0
  );
};

// Main function for GitHub Actions
async function fetchAndStoreOuraData() {
  try {
    console.log("Fetching Oura data...");
    const motionRecord = await getOura("motion");
    const sleepRecord = await getOura("sleep");
    const staminaRecord = await getOura("stamina");

    // Check if any of the records have empty data
    const hasEmptyData = isOuraDataEmpty(motionRecord) || 
                       isOuraDataEmpty(sleepRecord) || 
                       isOuraDataEmpty(staminaRecord);

    // Skip database insert if any data is empty
    if (hasEmptyData) {
      console.log("Skipping database insert - empty data detected from Oura API");
      return { 
        success: true, 
        message: "No new data available from Oura. Database update skipped.",
        emptyData: {
          motion: isOuraDataEmpty(motionRecord),
          sleep: isOuraDataEmpty(sleepRecord),
          stamina: isOuraDataEmpty(staminaRecord)
        }
      };
    }

    // Only proceed with database insert if all data is available
    console.log("Inserting data into Supabase...");
    const { error } = await supabase.from(OURA_TABLE_NAME).insert({
      stamina: staminaRecord,
      sleep: sleepRecord,
      motion: motionRecord,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Failed to insert data" };
    }

    return { success: true, message: "Oura data successfully stored" };
  } catch (error) {
    console.error("Function error:", error);
    return { error: "Internal server error" };
  }
}

// Run as a Node.js script
fetchAndStoreOuraData()
  .then(result => {
    if (result.success) {
      console.log("Success:", result.message);
      process.exit(0);
    } else {
      console.error("Error:", result.error);
      process.exit(1);
    }
  })
  .catch(error => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });