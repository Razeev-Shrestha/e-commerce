import { createSelector } from 'reselect';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);


export const selectDetailedCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections =>collections[collectionUrlParam]
           
    );

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);