import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useOutletContext } from 'react-router-dom';


day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const { isAuthorized } = useOutletContext();

 
const [DateTime,setDateTime] = useState('');
// TODO(developer): Set to client ID and API key from the Developer Console
// const CLIENT_ID = '1092382803013-dr211t3477r9qjtq4hkq59v7v0bf6mrh.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyCCiqvUpoMctwSHEFIAMZD6d1wRNFg4MkM';

// // Discovery doc URL for APIs used by the quickstart
// const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar';

// let tokenClient;
// let gapiInited = false;
// let gisInited = false;


  // const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     // Callback after api.js is loaded.
//       window.gapiLoaded = function() {
//       gapi.load('client', initializeGapiClient);
//     }

//     // Callback after the API client is loaded. Loads the
//     // discovery doc to initialize the API.
//     async function initializeGapiClient() {
//       await gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: [DISCOVERY_DOC],
//       });
//       gapiInited = true;
//       maybeEnableButtons();
//     }

//     // Callback after Google Identity Services are loaded.
//     window.gisLoaded = function(){
//       tokenClient = google.accounts.oauth2.initTokenClient({
//         client_id: CLIENT_ID,
//         scope: SCOPES,
//         callback: '', // defined later
//       });
//       gisInited = true;
//       maybeEnableButtons();
//     }

//     // Enables user interaction after all libraries are loaded.
//     function maybeEnableButtons() {
//       if (gapiInited && gisInited) {
          
//       }
//     }

//     gapiLoaded();
//     gisLoaded();
//   }, []);

  // Sign in the user upon button click.
  // function handleAuthClick() {
  //   // tokenClient.callback = async (resp) => {
  //   //   if (resp.error !== undefined) {
  //   //     throw (resp);
  //   //   }
    
  //   //   await listUpcomingEvents();
  //   // };

  //   if (gapi.client.getToken() === null) {
  //     // Prompt the user to select a Google Account and ask for consent to share their data
  //     // when establishing a new session.
  //     tokenClient.requestAccessToken({prompt: 'consent'});
  //     setIsAuthorized(true);
  //   } else {
  //     // Skip display of account chooser and consent dialog for an existing session.
  //     return;
  //     tokenClient.requestAccessToken({prompt: ''});
  //   }
  // }

  // Sign out the user upon button click.
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      
    }
  }

  // ... previous code ...

// Print the summary and start datetime/date of the next ten events in
// the authorized user's calendar. If no events are found an
// appropriate message is printed.
// async function listUpcomingEvents() {
//   let response;
//   try {
//     const request = {
//       'calendarId': 'primary',
//       'timeMin': (new Date()).toISOString(),
//       'showDeleted': false,
//       'singleEvents': true,
//       'maxResults': 10,
//       'orderBy': 'startTime',
//     };
//     response = await gapi.client.calendar.events.list(request);
//   } catch (err) {
//     console.log(err.message);
//     return;
//   }

//   const events = response.result.items;
//   if (!events || events.length == 0) {
//     console.log( 'No events found.');
//     return;
//   }
//   // Flatten to string to display
//   const output = events.reduce(
//       (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
//       'Events:\n');
//   console.log( output);
// }

const handleEvent = () =>{
  // Refer to the JavaScript quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/js
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.
// console.log(DateTime);
const event = {
  'summary': `Interview`,
  'location': `${jobLocation}`,
  'description': `Interview for the position of ${position} at ${company}` ,
  'start': {
    'dateTime': new Date(DateTime),
    'timeZone': 'America/Los_Angeles'
  },
    'end': {
    'dateTime': new Date(DateTime),
    'timeZone': 'America/Los_Angeles'
  },
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

const request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  console.log('Event created: ' + event.htmlLink);
});

}
// ... previous code ...


  const date = day(createdAt).format('MMM Do, YYYY');
//    const [ user, setUser ] = useState([]);
//    const [ profile, setProfile ] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://accounts.google.com/o/oauth2/v2/auth?
//  scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
//  include_granted_scopes=true&
//  response_type=token&
//  state=state_parameter_passthrough_value&
//  redirect_uri=http://localhost:5173/dashboard/all-jobs&
//  client_id=1092382803013-dr211t3477r9qjtq4hkq59v7v0bf6mrh.apps.googleusercontent.com`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [ user ]
//     );
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
          {jobStatus==="interview" ? (<>
          
          {/* <button className={isAuthorized ? 'btn cal-btn disabled' : 'btn cal-btn'} onClick={handleAuthClick}>Sign in</button> */}
          <button className={isAuthorized ? 'btn cal-btn add-btn' : 'btn cal-btn disabled add-btn'} onClick={handleEvent}>Add to calendar</button>
          <input type="datetime-local" name="date-time" id="date-time" onChange={e=>setDateTime(e.target.value)} />
          </>) : (
            <></>
          ) }
          
          
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
