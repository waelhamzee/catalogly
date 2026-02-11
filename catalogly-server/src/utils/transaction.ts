import { sequelize } from "../config/db.js";

/**
 * Runs the given callback inside a Sequelize transaction.
 * With CLS enabled, any Sequelize call inside the callback automatically
 * uses this transaction—no need to pass it through parameters.
 */
export async function withTransaction<T>(fn: () => Promise<T>): Promise<T> {
  return sequelize.transaction(async () => await fn());
}
