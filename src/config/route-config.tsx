import Basket from "../components/pages/Basket";
import BookTour from "../components/pages/booking/BookTour";
import BookingHistory from "../components/pages/BookingHistoryPage";
import HomePage from "../components/pages/HomePage";
import Login from "../components/forms/LoginForm";
import Logout from "../components/pages/Logout";
import { RouteType } from "../models/RouteType";
import Tours from "../components/pages/tour/Tours";
import AddUser from "../components/forms/UserForm";
import Users from "../components/pages/Users";
import TourItems from "../components/pages/tour/TourItemsPage";
import UpdateTour from "../components/pages/tour/UpdateTour";
import Settings from "../components/pages/Settings";
import TourPage from "../components/pages/booking/TourPage";
import BookTourPage from "../components/pages/booking/BookTourPage";
import NotificationPage from "../components/pages/NotificationPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import AddTour from "../components/pages/AddTour";

export const NOT_FOUND_PATH = '*'
export const HOME_PATH = '/';
export const TOURS_VIEW_PATH = '/tours/book';
export const TOUR_VIEW_PATH = '/tours/book/:tourId'
export const BOOK_TOUR_PATH = '/tours/book/:tourId/:tourItemId/:pax'
export const BASKET_PATH = '/basket';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';

// TODO export const ADD_TOUR_PATH = '/tours/:tourId';
export const ADD_TOUR_PATH = '/tours/add';
export const UPDATE_TOUR_PATH = '/tours/update/:tourId';

export const TOURS_PATH = '/tours';
export const TOUR_ITEMS_PATH = '/tour-items';
export const ADD_USER_PATH = '/users/add';
export const USERS_PATH = '/users'
export const SETTINGS_PATH = '/settings'
export const NOTIFICATION_PATH = '/notification'
 
export const BOOKING_HISTORY_PATH = '/bookings';
export const EDIT_BOOKING_PATH = '/bookings/:bookingId/:pax'

export const ROUTES: RouteType[] = [
    {path: NOT_FOUND_PATH, label: 'Not Found', element: <NotFoundPage/>, roles: ["any", "user", "admin", "agent"], displayRole: [""] },
    {path: HOME_PATH, label: 'Home', element: <HomePage/>, roles: ["any", "user", "admin", "agent"], displayRole: ["user", "any", "agent", "admin"]},
    {path: TOURS_VIEW_PATH, label: 'Tours', element: <BookTour/>, roles: ["any", "user", "admin", "agent"], displayRole: ["user", "any", "agent"]},
     //{path: TOUR_VIEW_PATH, label: 'Tour view', element: <TourPage/>, roles: ["any", "user", "admin", "agent"], displayRole: [""]},
    {path: TOUR_VIEW_PATH, label: 'Tour view', element: <TourPage/>, roles: ["any", "user", "admin", "agent"], displayRole: [""]},
    {path: BOOK_TOUR_PATH, label: 'Book tour', element: <BookTourPage/>, roles: ["user", "admin", "agent"], displayRole: [""]},
    {path: BASKET_PATH, label: 'Basket', element: <Basket/>, roles: [""], displayRole: ["any", "user"]},

    {path: UPDATE_TOUR_PATH, label: 'Update tour', element: <UpdateTour/>, roles: ["admin"], displayRole: [""]},
    {path: ADD_TOUR_PATH, label: 'Add tour', element: <AddTour/>, roles: ["admin"], displayRole: ["admin"]},


    {path: TOURS_PATH, label: 'Tours', element: <Tours/>, roles: ["admin"], displayRole: ["admin"]},
    {path: TOUR_ITEMS_PATH, label: 'Tour items', element: <TourItems/>, roles: ["admin"], displayRole: ["admin"]},
    {path: ADD_USER_PATH, label: 'Add user', element: <AddUser/>, roles: ["admin"], displayRole: [""]},
    {path: USERS_PATH, label: 'Users', element: <Users/>, roles: ["admin"], displayRole: [""]},
    {path: SETTINGS_PATH, label: 'Settings', element: <Settings/>, roles: ['admin'], displayRole: ['admin']},
    {path: NOTIFICATION_PATH, label: 'Notification', element: <NotificationPage/>, roles: ['admin'], displayRole: ['']},

    {path: BOOKING_HISTORY_PATH, label: 'Booking history', element: <BookingHistory/>, roles: ["admin", "agent"], displayRole: ["agent", "admin"]},

    {path: LOGIN_PATH, label: 'Login', element: <Login/>, roles: ["any"], displayRole: ["any"]},
    {path: LOGOUT_PATH, label: 'Logout', element: <Logout/>, roles: ["user", "admin", "agent"], displayRole: ["user", "admin", "agent"]},

]