import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react'; // Import useState
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from './scenes/team';
import Login from './scenes/login';
import Signup from './scenes/signup';
import Undangan from './scenes/undangan';
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import BAP from './scenes/bap';
import Calendar from "./scenes/calendar";
import { useUser } from './userContext';

function App() {
  const user = useUser();
  const location = useLocation();
  const [theme, colorMode] = useMode();

  const [teamData, setTeamData] = useState([]); // Initialize with an empty array

  const showShowBar = () => {
    const { pathname } = location;
    return !['/login', '/signup'].includes(pathname);
  };

  const handleFormSubmit = (formData) => {
    const newId = teamData.length + 1;
    const newUserData = { ...formData, id: newId, access: "user" };
    setTeamData([...teamData, newUserData]);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {showShowBar() && <Sidebar />}
          <main className="content">
          {showShowBar() && <Topbar />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team teamData={teamData} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/form" element={<Form onSubmit={handleFormSubmit} />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bap" element={<BAP />} />
              <Route path="/undangan" element={<Undangan />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
