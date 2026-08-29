export const env = {
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",

  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",
};