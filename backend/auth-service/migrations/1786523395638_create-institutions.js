exports.up = (pgm) => {
  pgm.createTable("institutions", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    name: {
      type: "varchar(255)",
      notNull: true,
    },

    subdomain: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    status: {
      type: "varchar(20)",
      notNull: true,
      default: "active",
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
  });

  pgm.addConstraint("institutions", "institutions_status_check", {
    check: "status IN ('active', 'suspended')",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("institutions");
};