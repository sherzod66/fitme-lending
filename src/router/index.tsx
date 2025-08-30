import { createBrowserRouter } from "react-router-dom";
import WrappedApp from "../App";
import PrivacyPolicy from "../screens/Policy";
import FeedbackForm from "../screens/DeleteAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedApp />,
  },
  {
    path: "/policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/delete-account",
    element: <FeedbackForm />,
  },
]);
