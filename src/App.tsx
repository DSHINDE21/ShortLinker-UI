import Provider from "./providers";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  //ToDo: later set token getting from login/signup api
  localStorage.setItem("token", "dummy-token");
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
};

export default App;
