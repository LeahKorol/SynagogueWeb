import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';

function AboutContact() {
    return (
        <main>
            <HelmetProvider>
                <Helmet>
                    <title>פאתי מזרח | אודות</title>
                </Helmet>

                <Header />
                
                <div className="App">
                    <MapEmbed />
                </div>
            </HelmetProvider>
        </main>
    );
}

export default AboutContact;
