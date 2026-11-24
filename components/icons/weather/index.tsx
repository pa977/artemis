import React from 'react';

const SunnyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const CloudyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
const PartlyCloudyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><path d="M22 10a3 3 0 0 0-3-3h-2.205a5.5 5.5 0 0 0-10.45 2.015"></path></svg>;

const WeatherIcon: React.FC<{ code: number }> = ({ code }) => {
    const getIcon = () => {
        // This is a simplified mapping. A real app would have more codes.
        if (code >= 113 && code <= 115) return <SunnyIcon />;
        if (code === 116) return <PartlyCloudyIcon />;
        if (code >= 117 && code <= 200) return <CloudyIcon />;
        return <CloudyIcon />; // Default icon
    };

    return <div className="w-16 h-16 text-green-700">{getIcon()}</div>;
};

export default WeatherIcon;