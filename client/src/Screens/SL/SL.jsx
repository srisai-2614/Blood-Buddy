import './SL.css';
import { Route,Routes,useNavigate } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
const SL=({handleLogout})=>{
    const Navigate=useNavigate();
    function Logout(){
        handleLogout()
        Navigate('/home',{replace:true})
    }
    return(
        <div style={{width:'100vw'}}>
            <div>
                <SearchForm/>
                <button onClick={()=>Logout()} className='Logout'>
                    LogOut
                </button>
            </div>
            <Routes>
                <Route path='/search' element={<SearchForm/>}/>
            </Routes>
        </div>
    )
}
export default SL;
