export class Category {
  id: number;
  name: string;
  name_other_language?: string;
  description?: string;
  acronym?: string;
  display_on_transfer_ticket_screen?: boolean;
  display_on_backend_screen?: boolean;
  priority?: number;
  // subCategories?: SubCategoryEntity[]
}
