import { defineRelations } from "drizzle-orm";
import { schema } from ".";

export const relations = defineRelations(schema, (r) => ({
  // Account Relations
  accountTable: {
    user: r.one.userTable({
      from: r.accountTable.userId,
      to: r.userTable.id,
    }),
  },

  // Booking Relations
  bookingTable: {
    booker: r.one.userTable({
      from: r.bookingTable.userId,
      to: r.userTable.id,
    }),
  },

  // Session Relations
  sessionTable: {
    user: r.one.userTable({
      from: r.sessionTable.userId,
      to: r.userTable.id,
    }),
  },

  // User Relations
  userTable: {
    accounts: r.many.accountTable({
      from: r.userTable.id,
      to: r.accountTable.userId,
    }),
    sessions: r.many.sessionTable({
      from: r.userTable.id,
      to: r.sessionTable.userId,
    }),
  },
}));
