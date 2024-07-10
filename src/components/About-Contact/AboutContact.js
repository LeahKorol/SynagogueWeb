import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';
import About from './About';
import Contact from './Contact';

function AboutContact() {
    return (
        <main>
            <HelmetProvider>
                <Helmet>
                    <title>פאתי מזרח | אודות</title>
                </Helmet>

                <Header />


                <About />
                <Contact />
                
                <div className="App">
                    <MapEmbed />
                </div>
            </HelmetProvider>
        </main>
    );
}

export default AboutContact;
