import Basket from "../components/pages/Basket";
import BookTour from "../components/pages/BookTour";
import BookingHistory from "../components/pages/BookingHistory";
import HomePage from "../components/pages/HomePage";
import Login from "../components/forms/LoginForm";
import Logout from "../components/pages/Logout";
import { RouteType } from "../models/RouteType";
import Tours from "../components/pages/Tours";
import AddUser from "../components/forms/UserForm";
import Users from "../components/pages/Users";
import TourItems from "../components/pages/TourItems";
import TourItemForm from "../components/forms/TourItemForm";
import AddTour from "../components/pages/AddTour";


export const HOME_PATH = '/';
export const BOOK_TOUR_PATH = '/tours/book';
export const BASKET_PATH = '/basket';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';

export const ADD_TOUR_PATH = '/tours/add';
export const TOURS_PATH = '/tours';
export const TOUR_ITEMS_PATH = '/tour-items';
export const ADD_USER_PATH = '/users/add';
export const USERS_PATH = '/users'

export const BOOKING_HISTORY_PATH = '/history';

export const ROUTES: RouteType[] = [
    {path: HOME_PATH, label: 'Home', element: <HomePage/>, roles: ["any", "user", "admin", "agent"], displayRole: ["user", "any"]},
    {path: BOOK_TOUR_PATH, label: 'Book a tour', element: <BookTour/>, roles: ["any", "user", "admin", "agent"], displayRole: ["user", "any", "agent"]},
    {path: BASKET_PATH, label: 'Basket', element: <Basket/>, roles: [""], displayRole: ["any", "user"]},

    {path: ADD_TOUR_PATH, label: 'Add tour', element: <AddTour/>, roles: ["admin"], displayRole: ["admin"]},
    {path: TOURS_PATH, label: 'Tours', element: <Tours/>, roles: ["admin"], displayRole: ["admin"]},
    {path: TOUR_ITEMS_PATH, label: 'Tour items', element: <TourItems/>, roles: ["admin"], displayRole: ["admin"]},
    {path: ADD_USER_PATH, label: 'Add user', element: <AddUser/>, roles: ["admin"], displayRole: [""]},
    {path: USERS_PATH, label: 'Users', element: <Users/>, roles: ["admin"], displayRole: [""]},

    {path: BOOKING_HISTORY_PATH, label: 'Booking history', element: <BookingHistory/>, roles: ["admin", "agent"], displayRole: ["agent"]},

    {path: LOGIN_PATH, label: 'Login', element: <Login/>, roles: ["any"], displayRole: ["any"]},
    {path: LOGOUT_PATH, label: 'Logout', element: <Logout/>, roles: ["user", "admin", "agent"], displayRole: ["user", "admin", "agent"]},

]