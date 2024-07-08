import React from 'react';
import Header from './Header';
import Hero from './Hero';
import PrayerTimes from './PrayerTimes';
import LessonsActivities from './LessonsActivities';
import Announcements from './Announcements';
import MapEmbed from './MapEmbed';

function HomePage() {
    // זמני תפילות ליום חול
    const weekdayTimes = {
        shacharit: "06:15",
        mincha_gedola: "13:15",
        mincha: "19:33",
        arvit_1: "20:08",
        arvit_2: "21:50",
    };

    // זמני תפילות לשבת
    const shabbatTimes = {
        mincha_erev_shabbat: "19:08",
        arvit_shabbat: "19:38",
        shacharit_shabbat: "08:30",
        mincha_gedola_shabbat: "12:30",
        mincha_ketana_shabbat: "19:10",
    };

    return (
        <main>
            <Header />
            <Hero />
            <PrayerTimes weekdayTimes={weekdayTimes} shabbatTimes={shabbatTimes} />
            <LessonsActivities />
            <Announcements />
            <div className="App">
                <MapEmbed />
            </div>
        </main>
    );
}

export default HomePage;
