exports.up = (pgm) => {
    pgm.createTable("audit_logs", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()",)
        },

        institution_id:{
            type: "uuid",
            notNull: true,
            references: "institution(id)",
            onDelete: "CASCADE",
        },

        actor_user_id:{
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },

    })
}
