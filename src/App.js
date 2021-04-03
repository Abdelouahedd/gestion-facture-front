import { lazy, Suspense } from "react";
import Spinner from "./component/shared/spinner/Spinner";

const Authenticated = lazy(() => import("./Authenticated"))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Authenticated />
    </Suspense>
  );
}

export default App;
