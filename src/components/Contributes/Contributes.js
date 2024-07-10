import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';

function Contributes() {
    return (
        <main>
            <HelmetProvider>
                <Helmet>
                    <title>פאתי מזרח | תרומות</title>
                </Helmet>

                <Header />
                
                <div className="App">
                    <MapEmbed />
                </div>
            </HelmetProvider>
        </main>
    );
}

export default Contributes;
