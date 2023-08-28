import { Outlet} from "react-router-dom";
import "./StyleSheets/layout.css"

const Layout = () => {
    return (
        <div className="container">
            <Outlet />
        </div>
    )
};

export default Layout;