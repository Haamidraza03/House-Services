import { useSelector } from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'

export default function PrivateRoute() {
    const {currentUser} = useSelector(state=>state.user);
    const {currentSp} = useSelector(state=>state.sp);
  return currentUser || currentSp ? <Outlet/> : <Navigate to='glogsin'/>
}
