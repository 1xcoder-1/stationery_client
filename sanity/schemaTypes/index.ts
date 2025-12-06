import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { blogCategoryType } from "./blogCategoryType";
import { blogType } from "./blogType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import { addressType } from "./addressType";

export const schemaTypes = [
  productType,
  categoryType,
  orderType,
  blogType,
  authorType,
  blogCategoryType,
  blockContentType,
  addressType,
];

// Export the schema object as expected by Sanity config
export const schema = {
  types: schemaTypes,
};