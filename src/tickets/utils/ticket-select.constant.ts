export const TICKET_SELECT = {
  id: true,
  name: true,
  phone: true,
  created_at: true,
  updated_at: true,
  ticket_status: {
    select: { id: true, name: true },
  },
  category: {
    select: { id: true, name: true },
  },
  sub_category: {
    select: { id: true, name: true },
  },
  sub_sub_category: {
    select: { id: true, name: true },
  },
};
