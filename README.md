 # [Tesla Super Charger Finder](https://www.teslasc.net/)

 <h4 align="center">A Tesla Super Charger Station geolocator</h1>

 <a href="https://www.teslasc.net/">Live App
 

## Summary
This project is a desktop web application that plots Tesla Supercharger Stations throughout the United States on a custom map interface, utilizing Google Maps and the US Department of Energy Alternative Fuel Stations API with React. A list of Charging Stations is generated near the user's location and enables nationwide search. Turn-by-turn navigation is implemented for users to their chosen or nearest Tesla Supercharger Station.

## Languages and Dependencies

* **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
* **[React](https://react.dev/)**
* **[Google Maps API]()**
* **[US Department of Energy Alternative Fuel Stations API]()**

## Project Directory Hierarchy

Upon successful setup (see **Setup Instructions**), you should see the following project directory hierarchy.

```
├── node_modules
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── addacharger.png
│   ├── allchargers.png
│   ├── favicon.ico
│   ├── homepage.png
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── reviews.png
│   ├── robots.txt
│   └── thumbnail.png
└── src
    ├── App.css
    ├── components
    │   ├── Individualcard.jsx
    │   ├── Newstation.jsx
    │   ├── app.jsx
    │   ├── carddisplay.jsx
    │   ├── map.jsx
    │   ├── reviewform.jsx
    │   └── search.jsx
    ├── error.jsx
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── nav.jsx
    ├── reportWebVitals.js
    ├── routes
    │   ├── allchargers.jsx
    │   ├── reviews.jsx
    │   └── root.jsx
    └── setupTests.js
```


## Project Directory Hierarchy
Upon successful setup (see **Setup Instructions**), you should see the following project directory hierarchy.


## Setup Instructions

To launch this project on your own local development environment, please go through the following instructions carefully:

1. Clone the repository into your local environment.
2. Open the directory in your favorite code editor.
3. Run the following commands in the terminal to open the app on port 3000 in your favorite browser.


```console 
npm i
```

```console 
npm start
```

4. Open index.js and edit line 45 to contain your Google API key
googleMapsApiKey="PASTE YOUR GOOGLE API KEY HERE"
Nothing will work without a valid google api key!


## Credits

The **Tesla Supercharger Finder** project is created and maintained by **Mordechai Bronfin** (2023).





### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
