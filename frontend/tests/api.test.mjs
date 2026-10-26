import test from "node:test";
import assert from "node:assert";

test("API helper formatting test", () => {
  function getApiUrl(base, endpoint) {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${base}${cleanEndpoint}`;
  }

  assert.strictEqual(getApiUrl("http://localhost:8000", "/api/health"), "http://localhost:8000/api/health");
  assert.strictEqual(getApiUrl("http://localhost:8000", "api/status"), "http://localhost:8000/api/status");
  assert.strictEqual(getApiUrl("", "/api/health"), "/api/health");
});
