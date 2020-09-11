import React from 'react';

import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';


import { selectDetailedCollection } from '../../redux/shop/shop.selector';

import { CollectionPageContainer,CollectionTitle,CollectionItemContainer} from './collection.style';


const CollectionPage = ({collection }) => {
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemContainer>
                {
                    items.map(item=><CollectionItem key ={item.id} item={item}/>)
                }
            </CollectionItemContainer>
        </CollectionPageContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection:selectDetailedCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage); 