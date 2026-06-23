#!/usr/bin/env node
/**
 * Verifies that Supabase migration files follow naming conventions
 * and contain required PostGIS extension setup.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");

const REQUIRED_TABLES = ["entities", "claims", "profiles", "roles", "roads"];

async function main() {
  let files;
  try {
    files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql"));
  } catch {
    console.error("FAIL: supabase/migrations directory not found");
    process.exit(1);
  }

  if (files.length === 0) {
    console.error("FAIL: no migration files found");
    process.exit(1);
  }

  const namingPattern = /^\d{14}_[\w-]+\.sql$/;
  const errors = [];

  for (const file of files) {
    if (!namingPattern.test(file)) {
      errors.push(`Invalid migration filename: ${file}`);
    }
  }

  const sorted = files.sort();
  const firstContent = await readFile(
    join(MIGRATIONS_DIR, sorted[0]),
    "utf-8",
  );
  if (!firstContent.includes("postgis")) {
    errors.push(`First migration ${sorted[0]} should enable PostGIS`);
  }

  let allContent = "";
  for (const file of sorted) {
    allContent += await readFile(join(MIGRATIONS_DIR, file), "utf-8");
  }

  for (const table of REQUIRED_TABLES) {
    if (!allContent.includes(`CREATE TABLE ${table}`)) {
      errors.push(`Missing CREATE TABLE ${table} in migrations`);
    }
  }

  if (errors.length > 0) {
    console.error("Migration verification failed:\n" + errors.join("\n"));
    process.exit(1);
  }

  console.log(`OK: ${files.length} migration(s) verified`);
}

main();
