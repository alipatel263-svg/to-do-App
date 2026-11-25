import { UserLogin } from "./user-login";
import { UserRegister } from "./user-register";


export function ToDoSection(){
    return (
        <div className="row">
            <div className="col">
                <div className="fs-2 fw-bold">Focus on what matters, TaskFlow handles the rest.</div>
                <div className="mt-3">
                    A minimal, corporate-grade workspace designed to declutter your mind. Organize projects, track deadlines, and achieve calm control over your schedule.
                </div>

            </div>
            <div className="col">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a href="#login" data-bs-toggle="tab" data-bs-target="#login" className="nav-link active" >User Login</a></li>
                    <li className="nav-item"><a href="#register" data-bs-toggle="tab" data-bs-target="#register" className="nav-link" >User Register</a></li>
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane active " id="login">
                        <UserLogin width='w-50' displayTitle='d-none' />
                    </div>
                    <div className="tab-pane "  id="register"  >
                        <UserRegister width="w-50" />
                    </div>

                </div>
            </div>

        </div>
    )
}
