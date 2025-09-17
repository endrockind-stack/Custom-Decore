import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Suggestions from './pages/Suggestions'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
export default function App(){return (<div><nav className='flex items-center justify-between px-6 py-4 bg-white shadow'><div className='text-2xl font-bold text-indigo-700'>Custom Decore</div><div className='space-x-4'><Link to='/'>Home</Link><Link to='/upload'>Upload</Link><Link to='/suggestions'>Suggestions</Link><Link to='/cart'>Cart</Link></div></nav><Routes><Route path='/' element={<Home/>}/><Route path='/upload' element={<Upload/>}/><Route path='/suggestions' element={<Suggestions/>}/><Route path='/cart' element={<Cart/>}/><Route path='/checkout' element={<Checkout/>}/></Routes></div>)}
