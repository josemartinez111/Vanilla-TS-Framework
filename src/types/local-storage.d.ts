// FILE: types/local-storage.d.ts
// _______________________________________________

import { ProductType } from "../types/types";

export type LocalStorageReturnType = {
	localeStorageGetItem: () => Array<ProductType>;
	localeStorageSetItem: (value: ProductType) => void;
	localeStorageRemoveItem: (id: number) => void;
};
