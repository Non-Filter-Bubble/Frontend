import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home Page"; // 홈 페이지의 제목
        metaDescription = "Welcome to our website!"; // 홈 페이지의 메타 설명
        break;
      default:
        title = "Page Not Found"; // 기본 제목
        metaDescription = "This page is not available."; // 기본 메타 설명
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
          'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
  );
}

export default App;