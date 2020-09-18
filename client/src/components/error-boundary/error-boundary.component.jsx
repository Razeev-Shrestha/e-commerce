import React from 'react';

import {
    ErrorImageContainer,
    ErrorImageOverlay,
    ErrorImageText
} from './error-boundary.styles';

class ErrorBoundary extends React.Component{
    constructor() {
        super();

        this.state = {
            hasErrorOccured: false
        };
    }

    static getDerivedStateFromError(error) {
        //process the error
        return { hasErrorOccured: true };
    }

    componentDidCatch(error, info) {
        console.log(error); 
    }

    render() {
        if (this.state.hasErrorOccured) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText>Sorry! this Page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;