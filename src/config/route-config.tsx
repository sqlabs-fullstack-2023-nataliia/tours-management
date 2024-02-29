import AddTour from "../components/pages/AddTour";
import BookTour from "../components/pages/BookTour";
import BookingHistory from "../components/pages/BookingHistory";
import HomePage from "../components/pages/HomePage";
import Login from "../components/pages/Login";
import Logout from "../components/pages/Logout";
import { RouteType } from "../models/RouteType";


export const HOME_PATH = '/';
export const BOOK_TOUR_PATH = '/tours';
export const ADD_TOUR_PATH = '/tours/add';
export const BOOKING_HISTORY_PATH = '/history';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout'


export const ROUTES: RouteType[] = [
    {path: HOME_PATH, label: 'Home', element: <HomePage/>},
    {path: BOOK_TOUR_PATH, label: 'Book a tour', element: <BookTour/>},
    {path: ADD_TOUR_PATH, label: 'Add new tour', element: <AddTour/>},
    {path: BOOKING_HISTORY_PATH, label: 'Booking history', element: <BookingHistory/>},
    {path: LOGIN_PATH, label: 'Login', element: <Login/>},
    {path: LOGOUT_PATH, label: 'Logout', element: <Logout/>} ,
]