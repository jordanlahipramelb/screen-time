import "./App.scss";
// import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";

import { AuthContextProvider } from "./context/AuthContext";

import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import TV from "./Pages/TV/TV";
import List from "./Pages/List/List";
import Search from "./Pages/Search/Search";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Landing from "./Pages/Landing/Landing";

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Header />
				<div className="App">
					<Container>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signup" element={<Login />} />
							<Route path="/trending" element={<Trending />} />
							<Route path="/movies" element={<Movies />} />
							<Route path="/tvshows" element={<TV />} />
							<Route path="/list" element={<List />} />
							<Route path="/search" element={<Search />} />
						</Routes>
					</Container>
				</div>
				{/* <Nav /> */}
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
