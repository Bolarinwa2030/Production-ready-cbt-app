exports.up = (pgm) => {
  pgm.createTable("refresh_tokens", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    token_hash: {
      type: "text",
      notNull: true,
    },

    expires_at: {
      type: "timestamptz",
      notNull: true,
    },

    revoked_at: {
      type: "timestamptz",
    },

    device_info: {
      type: "jsonb",
      notNull: true,
      default: "{}",
    },
  });

  pgm.createIndex(
    "refresh_tokens",
    ["user_id"],
    {
      name: "refresh_tokens_user_id_idx",
    },
  );

  pgm.createIndex(
    "refresh_tokens",
    ["token_hash"],
    {
      name: "refresh_tokens_token_hash_idx",
    },
  );
};

exports.down = (pgm) => {
  pgm.dropTable("refresh_tokens");
};