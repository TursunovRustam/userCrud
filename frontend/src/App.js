import Student from "./Student";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                    <Route path={"/admin/users"} element={<Student/>}/>
            </Routes>
        </div>
    );
}

export default App;