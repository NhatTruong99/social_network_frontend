import React, { useState, useEffect ,useRef} from "react";
import { Routes, Route, Link ,Outlet} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import {io} from "socket.io-client";

import AuthService from "./services/auth.service";
import AuthVerify from "./common/auth-verify";
import PrivateRoute from "./utils/PrivateRoute";
import Event from "./utils/Event";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PostList from "./components/Post/PostList";
import GroupList from "./components/Group/GroupList";
import GroupCreate from "./components/Group/GroupCreate";
import GroupPage from "./components/Group/GroupPage";
import ListConversation from "./components/Conversation/ListConversation";
import { setSocket } from "./redux/actions/SocketActions";

import ProfileComponent from "./components/Profile/ProfileComponent";
import Search from "./components/Search/Search";
import GroupEdit from "./components/Group/GroupEdit";

import Navbar from "./Navbar";
import PostDetail from "./components/Post/PostDetail";
import AddUserRole from './components/Admin/UserRole/AddUserRole';
import EditUserRole from './components/Admin/UserRole/EditUserRole';
import UserRoleDataTable from './components/Admin/UserRole/UserRoleDataTable';

import AddGroup from './components/Admin/Group/AddGroup';
import EditGroup from './components/Admin/Group/EditGroup';
import GroupDataTable from './components/Admin/Group/GroupDataTable';
import Chart from "./components/Admin/Statistics/Chart";
import CountRow from './components/Admin/Statistics/CountRow';

import NotificationList from "./components/Notification/NotificationList";
import RequesterList from "./components/Friend/ListRequester";

import AdminNavbar from "./adminNavbar";
const socket = io.connect("ws://localhost:8900");

function App() {
  
  const [currentUser, setCurrentUser] = useState(undefined);

  const user = AuthService.getCurrentUser();

  const dispatch = useDispatch();
  dispatch(setSocket(socket));
  
  useEffect(() => {
    
    if (user) {
      setCurrentUser(user);
    }

    Event.on("logout", () => {
      logOut();
    });

    return () => {
      Event.remove("logout");
      socket.close();
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  
  const AppLayout = () => (
	<>
	  <main className={"main--container"}>
		<div className={"main--content"}>
		<div className="theme-layout">
		{ currentUser &&  <Navbar user={user} currentUser={currentUser} logOut={logOut}/>}

		  <Outlet />
		  </div>
		</div>
	  </main>
	</>
  );

  const AdminLayout = () => (
	<>
	  <main className={"admin--container"}>
		<div className={"admin--content"}>
		<div className="wrapper">

		<AdminNavbar />
		  <Outlet />
		</div>
		</div>
	  </main>
	</>
  );
  return (
	<>
        <Routes>
		<Route element={<AppLayout />} >
				{
				!currentUser
				?<Route path="/" element={<Login/>} />
				:<Route path="/" element={<PostList/>} />}
				
				<Route path="/register" element={<Register/>} />
				<Route path="/posts" element={
				<PrivateRoute>
					<PostList />
				</PrivateRoute>
				} />

				<Route path="/detail/post/:postID" element={
					<PrivateRoute>
					<PostDetail />
					</PrivateRoute>
				} />
				<Route path="/groups" element={
					<PrivateRoute>
					<GroupList />
					</PrivateRoute>
				} />
				<Route path="/group/create" element={
					<PrivateRoute>
					<GroupCreate />
					</PrivateRoute>
				} />
				<Route path="/group/:id" element={
					<PrivateRoute>
					<GroupPage />
					</PrivateRoute>
				} />

				<Route path="/group/:id/edit" element={
					<PrivateRoute>
						<GroupEdit />
					</PrivateRoute>
				} />

				<Route path="/profile/:userID" element={
					<PrivateRoute>
					<ProfileComponent />
					</PrivateRoute>
				} />
				<Route path="/conversation" element={
					<PrivateRoute>
					<ListConversation />
					</PrivateRoute>
				} />
				<Route path="/search/:keyword" element={
					<PrivateRoute>
					<Search />
					</PrivateRoute>
				} />

				<Route path="/list-requester/:userID" element={
					<PrivateRoute>
					<RequesterList />
					</PrivateRoute>
				}/>
				
		</Route>


		<Route element={<AdminLayout />} >

			<Route path="/admin/user-role/read" element={<UserRoleDataTable/>}/>
			<Route path="/admin/user-role/create" element={<AddUserRole/>}/>W
			<Route path="/admin/user-role/edit/:userID/:roleID" element={<EditUserRole/>}/>

			<Route path="/admin/group/read" element={<GroupDataTable/>}/>
			<Route path="/admin/group/create" element={<AddGroup/>}/>
			<Route path="/admin/group/edit/:id" element={<EditGroup/>}/>

		
			<Route path="admin/chart" element={<Chart/>}/>
			<Route path="admin/countRow" element={<CountRow/>}/>    
		</Route>




			
        </Routes>
        <AuthVerify logOut={logOut}/>
     </>
  );
}
export default App;