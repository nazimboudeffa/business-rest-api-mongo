import dotenv from "dotenv"

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development"

const envFound = dotenv.config()
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 9000),

  databaseURL: process.env.DATABASE_URL,
  redisURI: process.env.REDIS_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.NODE_ENV === "test" ? "test" : process.env.JWT_SECRET,

  cookieSecret:
    process.env.NODE_ENV === "test" ? "test" : process.env.COOKIE_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api/v1",
  },

  env: process.env.NODE_ENV || "development",
}

export default config