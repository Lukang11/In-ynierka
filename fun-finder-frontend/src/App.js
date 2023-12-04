
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './Utils/PrivateRoute';
import { AuthProvider } from './Utils/AuthProvider';
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import EventsPage from "./Components/Events/EventsPage";
import CreateEvent from "./Components/Events/CreateEvent";
import ChatPageComponent from "./Components/ChatPage/ChatPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import WelcomePageHeader from "./Components/Header/WelcomePageHeader";
import { EventInfo } from "./Components/Events/EventInfo";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<> <Header /><WelcomePage /> </>} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Header />
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<> <Header /><Login /> </>} />
            <Route path="/register" element={<> <Header /><Register /> </>} />
            <Route path="/chat" element={<> <Header /><ChatPageComponent /> </>} />
            <Route path="/events" element={<> <Header /><EventsPage /> </>} />
          <Route path="/create-event" element={<> <Header /><CreateEvent /> </>} />
          <Route path="/event-info/:id" element={<> <Header /><EventInfo /> </>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;