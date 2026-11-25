import { Outlet, Link } from "react-router-dom";


export function ToDoHome(){

    
    return(
        <div className=" bg-secondary">
            <header className="d-flex bg-light align-items-center justify-content-between p-3">
                <span className="fs-3 fw-bold text-primary bi bi-pencil-square" ><Link to='/' className="text-decoration-none">Task Manager</Link></span>
                <div className="fs-5" >
                    <span className="mx-4">Home</span>
                    <span className="mx-4">Pricing</span>
                    <span className="mx-4">Features</span>
                    <span className="mx-2">
                        <Link to="/search">Search</Link>
                    </span>
                </div>
                <div>
                    <button className="btn"><span className="bi bi-search mx-2"></span></button>
                    <span className="btn btn-primary">Get Started</span>
                </div>

            </header>
            <section className="p-5 bg-light" style={{height:"600px"}}>               
                <Outlet />
            </section>

        </div>
    )
}
