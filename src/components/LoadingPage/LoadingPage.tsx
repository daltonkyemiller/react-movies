import React from 'react';

type LoadingPageProps = {};

const LoadingPage = ({}: LoadingPageProps) => {
    return (
        <div className={`flex min-h-screen items-center justify-center`}>
            <h1>Loading...</h1>
        </div>
    );
};

export default LoadingPage;
