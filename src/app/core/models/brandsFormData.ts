import { Brands } from './brands';

export interface BrandsFormData {
  isUpdateMode: boolean;
  brandsToUpdate?: Brands;
  idToCreate?: number;
}
