import MainPage from "../pages/mainPage/mainPage";
import {ItemPage, SearchItemPage} from "../common/layout/itemPage/itemPage";
import SubFilterPage from "../pages/subfilterPage/subfilterPage";
import FilterPage from "../pages/filterPage/filterPage";
import AdminPage from "../pages/adminPage/adminPage";
import UserProfile from "../pages/regPages/UserProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage/>}></Route>
        <Route exact path="/admin" element={<AdminPage/>}></Route>
        <Route exact path="/itemPage/:productId" element={<ItemPage/>}></Route>
        <Route exact path="/itemSearchPage/:productId" element={<SearchItemPage/>}></Route>
        <Route exact path="/itemFilterPage/:filter" element={<SubFilterPage/>}></Route>
        <Route exact path="/itemCategoryPage/:category" element={<FilterPage/>}></Route>
        <Route exact path="/cabinet" element={<UserProfile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
