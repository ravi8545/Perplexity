import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async ({
  query,
  topic = "general",
  timeRange,
}) => {
  console.log("===== TAVILY TOOL CALLED =====");
  console.log({ query, topic, timeRange });

  const options = {
    topic,
    searchDepth: "advanced",
    maxResults: 5,
    includeAnswer: true,
  };

  if (timeRange) {
    options.timeRange = timeRange;
  }

  const results = await tavily.search(query, options);

  console.dir(results, { depth: null });

  // Agent ko concise result do
  return results.answer || JSON.stringify(results.results);
};