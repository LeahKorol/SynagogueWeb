import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';
import Contributes from './Contributes';

function ContributesPage() {
    return (
        <div>
            <main>
                <HelmetProvider>
                    <Helmet>
                        <title>פאתי מזרח | תרומות</title>
                    </Helmet>

                    <Header />

                    <Contributes />
                    
                    <div className="App">
                        <MapEmbed />
                    </div>
                </HelmetProvider>
            </main>
        </div>
    );
}

export default ContributesPage;
