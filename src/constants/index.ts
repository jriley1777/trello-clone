import Splash from '../pages/Splash';
import Auth from '../pages/Auth';
import Logout from '../pages/Logout';
import Board from '../pages/Board';
import UserHome from '../pages/UserHome';
import MissingPage from '../pages/Missing';


export const APP_NAME="Taskboard";

export const URLS = {
    INDEX: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    USER: '/user',
    BOARD: '/boards'
};

export const getUserRoute: (id: string) => string = (userId: string) => 
    `/${URLS.USER}/${userId}`;
export const getBoardRoute: (id: string) => string = (boardId: string) => 
    `/${URLS.BOARD}/${boardId}`;

export const ROUTES = [
    {
    route: URLS.INDEX,
    exact: true,
    component: Splash
    },
    {
    route: URLS.LOGIN,
    exact: true,
    component: Auth
    },
    {
    route: URLS.SIGNUP,
    exact: true,
    component: Auth
    },
    {
    route: URLS.LOGOUT,
    exact: true,
    component: Logout
    },
    {
    route: URLS.USER,
    exact: false,
    component: UserHome
    },
    {
    route: URLS.BOARD,
    exact: false,
    component: Board
    },
    {
    route: URLS.INDEX,
    exact: false,
    component: MissingPage
    }
];