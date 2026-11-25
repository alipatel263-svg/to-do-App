import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { UserLogin } from "../components/user-login";
import { ToDoSection } from "../components/todo-section";
import { UserRegister } from "../components/user-register";
import { UserDashboard} from "../components/user-dashboard";
import { Search } from "../components/search";

const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children:[
            {
                index : true,

                element: <ToDoSection />
            },
            {
                path: 'login',
                element: <UserLogin width='w-25' displayTitle='d-block' />
            },
            {
                path: 'register',
                element: <UserRegister width='w-25 ' />
            }
            
        ]
    },
     {
         path:'dashboard',
         element: <UserDashboard />
       },
       {
            path: 'search',
            element: <Search />

       }
           
])

export default router;
