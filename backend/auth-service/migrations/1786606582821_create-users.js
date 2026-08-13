exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    institution_id: {
      type: "uuid",
      notNull: true,
      references: "institutions(id)",
      onDelete: "CASCADE",
    },

    email: {
      type: "varchar(255)",
      notNull: true,
    },

    password_hash: {
      type: "text",
      notNull: true,
    },

    role: {
      type: "varchar(20)",
      notNull: true,
      default: "student",
    },

    status: {
      type: "varchar(20)",
      notNull: true,
      default: "invited",
    },

    mfa_enabled: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    last_login_at: {
      type: "timestamptz",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },

    deleted_at: {
      type: "timestamptz",
    },
  });

  pgm.addConstraint("users", "users_role_check", {
    check: "role IN ('student', 'instructor', 'admin')",
  });

  pgm.addConstraint("users", "users_status_check", {
    check: "status IN ('active', 'invited', 'disabled')",
  });

  pgm.createIndex(
    "users",
    ["institution_id", "email"],
    {
      unique: true,
      name: "users_institution_email_unique",
    },
  );

  pgm.createIndex(
    "users",
    ["institution_id", "role"],
    {
      name: "users_institution_role_idx",
    },
  );
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};