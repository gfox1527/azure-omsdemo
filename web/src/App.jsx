import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {SeverityLevel} from '@microsoft/applicationinsights-web';
import './App.css';
import { getAppInsights } from './TelemetryService';
import TelemetryProvider from './telemetry-provider';

const Home = () => (
    <div>
        <h2>Home Page</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About Page</h2>
    </div>
);

const Header = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
    </ul>
);

const App = () => {
    let appInsights = null;

    function trackException() {
        appInsights.trackException({ error: new Error('some error'), severityLevel: SeverityLevel.Error });
    }

    function trackTrace() {
        appInsights.trackTrace({ message: 'some trace', severityLevel: SeverityLevel.Information });
    }

    function trackEvent() {
        appInsights.trackEvent({ name: 'some event' });
    }

    function throwError() {
        let foo = {
            field: { bar: 'value' }
        };

        // This will crash the app; the error will show up in the Azure Portal
        return foo.fielld.bar;
    }

    function reqListener () {
        console.log(this.responseText);
      }

    function ajaxRequest() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener);
        xhr.open('GET', 'https://trnieloms.azure-api.net/inventory/dependency');
        xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '<APIM_LEY>');
        xhr.send();
    }

    async function fetchRequest() {
        let response = await fetch('https://trnieloms.azure-api.net/inventory/dependency', {
            headers: {
                'Ocp-Apim-Subscription-Key': '<APIM_KEY>'
            }
        });

        console.log(response.text());
    }

    return (
      <BrowserRouter>
        <TelemetryProvider instrumentationKey="<APPINSIGHTS_KEY_HERE>" after={() => { appInsights = getAppInsights() }}>
          <div >
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
          <div className="App">
            <button onClick={trackException}>Track Exception</button>
            <button onClick={trackEvent}>Track Event</button>
            <button onClick={trackTrace}>Track Trace</button>
            <button onClick={throwError}>Autocollect an Error</button>
            <button onClick={ajaxRequest}>Autocollect a Dependency (XMLHttpRequest)</button>
            <button onClick={fetchRequest}>Autocollect a dependency (Fetch)</button>
          </div>
        </TelemetryProvider>
      </BrowserRouter>
    );
};

export default App;