const getEnv = (name: string) => {
  console.log(name);
  const value = process.env[name];
  console.log(value);
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
};
