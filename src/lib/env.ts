const getEnv = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
  NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET"),
};
