import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import ExcelInputMeetups from "./pages/ExcelInputMeetups";
import Layout from "./components/layout/Layout";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<AllMeetupsPage />} />
          <Route path="/new-meetup" element={<NewMeetupPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/input" element={<ExcelInputMeetups />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
