import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';
import Gallery from './Gallery'
import HallDetails from './HallDetails'
import MapEmbed from '../Footer/MapEmbed';

function EventHall() {
    return (
        <main>
            <HelmetProvider>
                <Helmet>
                    <title>פאתי מזרח | אולם אירועים</title>
                </Helmet>

                <Header />

                <Gallery />
                <HallDetails />
                
                <div className="App">
                    <MapEmbed />
                </div>
            </HelmetProvider>
        </main>
    );
}

export default EventHall;
