import {
  Assistance,
  AssistanceTwo,
  CreateAccount,
  Educational,
  EducationalTwo,
  EnterHotels,
  EnterHotelsTwo,
  Juerrys,
  JuerrysTwo,
  Meeting,
  MeetingTwo,
  Memberships,
  MembershipsTwo,
  Powers,
  PowersTwo,
  Programs,
  ProgramsTwo,
  PublicInformation,
  Seminars,
  SeminarsTwo,
  Users,
  CreateAdmin,
  UsersTwo,
  ViewAdminAccounts,
  JuerrysThree,
  JuerrysFour,
  MaydayRequests,
  AttendanceList,
  Services,
  ProgramsDate,
  ProgramsAddDate,
  Provinces,
  ProvincesAdd,
  UpdateImages,
  Hotel,
  UpdateHotel,
} from "./pages/index";
import { Navbar, SideBar } from "./components/index";
import { Navigate, Route, Routes } from "react-router-dom";
import Logo from "./images/photo1686213216_clipdrop-background-removal.png";
import Login from "./pages/Login/Login";
import RequireAuth, { RequireLogin } from "./Context/RequireAuth";

const App = () => {
  !window.localStorage.getItem("token") ? (
    <Navigate to="/login" />
  ) : (
    <Navigate to="/" />
  );
  return (
    <>
      <div className=" relative flex">
        <SideBar />
        <div className=" container mx-auto relative">
          <Navbar />
          <Routes>
            {/* start login  */}
            <Route
              path={"/login"}
              element={
                <RequireLogin>
                  <Login />
                </RequireLogin>
              }
            />
            {/* end login */}
            {/* start wibsite  */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <h1 className="grid place-content-center h-[80vh]">
                    <img src={Logo} alt="" className="w-[250px]" />
                  </h1>
                </RequireAuth>
              }
            />
            {/* / / /  wibsite  */}
            {/* no page  */}
            <Route
              path="*"
              element={
                <RequireAuth>
                  <h1 className="grid place-content-center h-[80vh] text-Brown font-semibold ">
                    404 | no page found
                  </h1>
                </RequireAuth>
              }
            />
            {/* end no page  */}
            {/* start programs  */}
            <Route
              path="programs-Date/:id"
              element={
                <RequireAuth>
                  <Programs />
                </RequireAuth>
              }
            />
            <Route
              path="programs-Date/:id/:idU"
              element={
                <RequireAuth>
                  <ProgramsTwo />
                </RequireAuth>
              }
            />
            <Route
              path="programs-Date"
              element={
                <RequireAuth>
                  <ProgramsDate />
                </RequireAuth>
              }
            />
            <Route
              path="programs/:id"
              element={
                <RequireAuth>
                  <ProgramsAddDate />
                </RequireAuth>
              }
            />
            {/* end programs  */}
            {/* start seminars */}
            <Route
              path="seminars"
              element={
                <RequireAuth>
                  <Seminars />
                </RequireAuth>
              }
            />
            <Route
              path="seminars/:id"
              element={
                <RequireAuth>
                  <SeminarsTwo />
                </RequireAuth>
              }
            />
            {/* end seminars */}
            {/* start juerrys  */}
            <Route
              path="juerrys/:id"
              element={
                <RequireAuth>
                  <Juerrys />
                </RequireAuth>
              }
            />
            <Route
              path="juerrys/:id/:idU"
              element={
                <RequireAuth>
                  <JuerrysTwo />
                </RequireAuth>
              }
            />
            <Route
              path="juerrys"
              element={
                <RequireAuth>
                  <JuerrysThree />
                </RequireAuth>
              }
            />
            <Route
              path="juerrys/item/:id"
              element={
                <RequireAuth>
                  <JuerrysFour />
                </RequireAuth>
              }
            />
            {/* end juerrys  */}
            {/* start Provinces  */}
            <Route
              path="provinces"
              element={
                <RequireAuth>
                  <Provinces />
                </RequireAuth>
              }
            />
            <Route
              path="provinces/:id"
              element={
                <RequireAuth>
                  <ProvincesAdd />
                </RequireAuth>
              }
            />
            {/* end Provinces */}
            {/* start video */}
            <Route
              path="meeting"
              element={
                <RequireAuth>
                  <Meeting />
                </RequireAuth>
              }
            />
            <Route
              path="meeting/:id"
              element={
                <RequireAuth>
                  <MeetingTwo />
                </RequireAuth>
              }
            />
            {/* end video */}
            {/* الحضور */}
            <Route
              path="assistance"
              element={
                <RequireAuth>
                  <Assistance />
                </RequireAuth>
              }
            />
            <Route
              path="assistance/:id"
              element={
                <RequireAuth>
                  <AssistanceTwo />
                </RequireAuth>
              }
            />
            {/* الحضور */}
            {/* بداية مواد التعليمية  */}
            <Route
              path="educational"
              element={
                <RequireAuth>
                  <Educational />
                </RequireAuth>
              }
            />
            <Route
              path="educational/:id"
              element={
                <RequireAuth>
                  <EducationalTwo />
                </RequireAuth>
              }
            />
            {/* نهاية مواد التعليمية  */}
            {/* start users */}
            <Route
              path="users"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="users/:id"
              element={
                <RequireAuth>
                  <UsersTwo />
                </RequireAuth>
              }
            />
            <Route
              path="users/account/:id"
              element={
                <RequireAuth>
                  <CreateAccount />
                </RequireAuth>
              }
            />
            {/* end users */}
            {/* عضويات */}
            <Route
              path="Memberships"
              element={
                <RequireAuth>
                  <Memberships />
                </RequireAuth>
              }
            />
            <Route
              path="Memberships/:id"
              element={
                <RequireAuth>
                  <MembershipsTwo />
                </RequireAuth>
              }
            />
            {/* عضويات نهاية*/}
            {/* start roles */}
            <Route
              path="Powers"
              element={
                <RequireAuth>
                  <Powers />
                </RequireAuth>
              }
            />
            <Route
              path="Powers/updete/:id"
              element={
                <RequireAuth>
                  <PowersTwo />
                </RequireAuth>
              }
            />
            {/* end roles */}
            {/* start hotels */}
            <Route
              path="hotels"
              element={
                <RequireAuth>
                  <EnterHotels />
                </RequireAuth>
              }
            />
            <Route
              path="hotels/create-Enter-hotels"
              element={
                <RequireAuth>
                  <EnterHotelsTwo />
                </RequireAuth>
              }
            />
            <Route
              path="hotels/:id"
              element={
                <RequireAuth>
                  <Hotel />
                </RequireAuth>
              }
            />
            <Route
              path="hotels/:id"
              element={
                <RequireAuth>
                  <Hotel />
                </RequireAuth>
              }
            />
            <Route
              path="hotels/UpdateHotel/:id"
              element={
                <RequireAuth>
                  <UpdateHotel />
                </RequireAuth>
              }
            />
            {/* end hotels */}
            {/* start  admins  */}
            <Route
              path="admin-account/:id"
              element={
                <RequireAuth>
                  <CreateAdmin />
                </RequireAuth>
              }
            />
            <Route
              path="View-admin-accounts"
              element={
                <RequireAuth>
                  <ViewAdminAccounts />
                </RequireAuth>
              }
            />
            {/* end admins  */}
            {/* بداية معلومات عامة */}
            <Route
              path="publicInformation"
              element={
                <RequireAuth>
                  <PublicInformation />
                </RequireAuth>
              }
            />
            {/*نهاية معلومات عامة */}
            {/* طلبات الاستغاثة  */}
            <Route
              path="MaydayRequests"
              element={
                <RequireAuth>
                  <MaydayRequests />
                </RequireAuth>
              }
            />
            {/* طلبات الاستغاثة  */}
            {/* بداية قائمة الحضور  */}
            <Route
              path="AttendanceList"
              element={
                <RequireAuth>
                  <AttendanceList />
                </RequireAuth>
              }
            />
            {/* نهاية قائمة الحضور  */}
            {/* بداية المسعفين  */}
            <Route
              path="firstaid"
              element={
                <RequireAuth>
                  <Services />
                </RequireAuth>
              }
            />
            {/* نهاية المسعفين  */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
