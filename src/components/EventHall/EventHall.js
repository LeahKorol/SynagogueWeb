import React from 'react';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';

function EventHall() {
    return (
        <main>
            <Header />
            
            <div className="App">
                <MapEmbed />
            </div>
        </main>
    );
}

export default EventHall;
