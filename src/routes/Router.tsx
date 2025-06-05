import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Main from "../pages/Main";
import News from "../pages/Notices";
import NoticeDetail from "../pages/NoticeDetail";
import FAQ from "../pages/FAQ";

const AppRouter = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/notice" element={<News />} />
      <Route path="/notice/:documentId" element={<NoticeDetail />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  </Router>
);

export default AppRouter;
