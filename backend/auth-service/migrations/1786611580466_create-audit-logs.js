exports.up = (pgm) => {
  pgm.createTable("audit_logs", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    institution_id: {
      type: "uuid",
      notNull: true,
    },

    actor_user_id: {
      type: "uuid",
      notNull: true,
    },

    action: {
      type: "varchar(100)",
      notNull: true,
    },

    target_type: {
      type: "varchar(100)",
      notNull: true,
    },

    target_id: {
      type: "uuid",
      notNull: true,
    },

    metadata: {
      type: "jsonb",
      notNull: true,
      default: {},
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex(
    "audit_logs",
    ["institution_id", "created_at"],
    {
      name: "audit_logs_institution_created_idx",
    },
  );
};

exports.down = (pgm) => {
  pgm.dropTable("audit_logs");
};