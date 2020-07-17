import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.util';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component';

import CollectionPage from '../collection/collection.component';
import {updateCollections } from '../../redux/shop/shop.action';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class shopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef= firestore.collection('collections');
    /*onsnapshot changed to .get().then() this is a promise based api call easier than live reloading that firebase handles  */
    /* this is asynchronous event handling  */
        
        // collectionRef.onSnapshot(async snapshot => { ==> instead of using this we can use below to make promises 
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

    /*making a rest api call to fetch native data  */
        // fetch(
        //     'https://firestore.googleapis.com/v1/projects/e-commerce-656c9/databases/(default)/documents/collections'
        // )
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));
    
    }

    /* component=>render to pass props */
    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (<CollectionPageWithSpinner isLoading={loading} {...props} />
                    )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null,mapDispatchToProps)(shopPage);

