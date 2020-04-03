import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
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
    USER: '/:userId/boards',
    BOARD: '/b/:boardId/taskboard'
};

export const buildUserURI = (userId: string) => {
    return `/${userId}/boards`;
}

export const buildBoardURI = (boardId: string) => {
  return `/b/${boardId}/taskboard`;
};

export const ROUTES = [
         {
           route: URLS.INDEX,
           exact: true,
           component: Splash,
           isPrivate: false
         },
         {
           route: URLS.LOGIN,
           exact: true,
           component: Login,
           isPrivate: false
         },
         {
           route: URLS.SIGNUP,
           exact: true,
           component: Signup,
           isPrivate: false
         },
         {
           route: URLS.LOGOUT,
           exact: true,
           component: Logout,
           isPrivate: false
         },
         {
           route: URLS.USER,
           exact: true,
           component: UserHome,
           isPrivate: true
         },
         {
           route: URLS.BOARD,
           exact: true,
           component: Board,
           isPrivate: true
         },
         {
           route: URLS.INDEX,
           exact: false,
           component: MissingPage,
           isPrivate: false
         }
       ];