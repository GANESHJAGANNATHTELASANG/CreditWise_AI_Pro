import { createClient } from "redis";

console.log(
  "Redis host:",
  process.env.REDIS_URL
    ? new URL(process.env.REDIS_URL).hostname
    : "NO REDIS URL",
);
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

const connectRedis = async () => {
  try {
    console.log("Connecting to Redis...");
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    throw error;
  }
};

export { redisClient, connectRedis };
