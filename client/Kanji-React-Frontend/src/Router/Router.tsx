import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import { FlashCard } from "../pages/FlashCard/FlashCard";
import { Navbar } from "../Components/Navbar/Navbar";
import { Profile } from "../pages/Profile/Profile";
import { KanjiTest } from "../pages/KanjiTest/KanjiTest";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }, 
    {
        path: "/login",
        element: <Navbar><Login/></Navbar>
    }, 
    {
        path: "/FlashCard",
        element: <Navbar><FlashCard/></Navbar>
    },
    {
        path: "/Profile",
        element: <Navbar><Profile/></Navbar>
    },
    {
        path: "/KanjiTest",
        element: <Navbar><KanjiTest/></Navbar>
    }
])