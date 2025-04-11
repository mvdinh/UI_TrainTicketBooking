import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Layout from './Layout/Layout';
import DatCho from './pages/DatCho';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="tra-cuu-ve" element={<Search/>} />
          <Route path="dat-cho" element={<DatCho/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
