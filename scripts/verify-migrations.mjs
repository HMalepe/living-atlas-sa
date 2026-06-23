#!/usr/bin/env node
/**
 * Verifies that Supabase migration files follow naming conventions
 * and contain required PostGIS extension setup.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");

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

  const firstMigration = files.sort()[0];
  const content = await readFile(join(MIGRATIONS_DIR, firstMigration), "utf-8");
  if (!content.includes("postgis")) {
    errors.push(`First migration ${firstMigration} should enable PostGIS`);
  }

  if (errors.length > 0) {
    console.error("Migration verification failed:\n" + errors.join("\n"));
    process.exit(1);
  }

  console.log(`OK: ${files.length} migration(s) verified`);
}

main();
