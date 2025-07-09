const getEnv = (name: string) => {
  sconst value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
};
