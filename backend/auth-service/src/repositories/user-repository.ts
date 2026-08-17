import { pool } from "../db/pool.js";

export async function findUserByEmail(
  institutionId: string,
  email: string,
) {
  const result = await pool.query(
    `
      SELECT
        id,
        institution_id,
        email,
        password_hash,
        role,
        status,
        mfa_enabled,
        last_login_at,
        created_at,
        updated_at
      FROM users
      WHERE institution_id = $1
        AND email = $2
        AND deleted_at IS NULL
      LIMIT 1
    `,
    [institutionId, email],
  );

  return result.rows[0] ?? null;
}

export async function createUser({
  institutionId,
  email,
  passwordHash,
  role,
  status,
}: {
  institutionId: string;
  email: string;
  passwordHash: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "invited" | "disabled";
}) {
  const result = await pool.query(
    `
      INSERT INTO users (
        institution_id,
        email,
        password_hash,
        role,
        status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        institution_id,
        email,
        role,
        status,
        mfa_enabled,
        last_login_at,
        created_at,
        updated_at
    `,
    [
      institutionId,
      email,
      passwordHash,
      role,
      status,
    ],
  );

  return result.rows[0];
}