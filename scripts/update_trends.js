const fs = require("fs");
const path = require("path");

function nowISO() {
  return new Date().toISOString();
}

function makeMock() {
  const countries = ["PT", "ES", "FR", "US", "BR", "GB", "DE"];
  const topics = [
    "AI tools",
    "Football transfer",
    "Crypto market",
    "New movie trailer",
    "Elections debate",
    "Tech layoffs",
    "Space mission",
  ];

  const data = {
    meta: {
      generatedAt: nowISO(),
      source: "mock",
      refreshMinutes: 30,
    },
    countries: {},
  };

  for (const c of countries) {
    data.countries[c] = Array.from({ length: 10 }).map((_, i) => ({
      id: `${c}-${i}-${Date.now()}`,
      title: topics[Math.floor(Math.random() * topics.length)],
      type: ["search", "news", "social"][Math.floor(Math.random() * 3)],
      updatedAt: nowISO(),
      popularity: Math.floor(Math.random() * 100),
    }));
  }

  return data;
}

const outPath = path.join(process.cwd(), "public", "trends.json");
const payload = makeMock();

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");

console.log("✅ Updated public/trends.json");
