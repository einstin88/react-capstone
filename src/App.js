import { Route, Routes } from 'react-router-dom';

import Authentication from './routes/authentication/authentication.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import routes from './utils/routes';

const App = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path={routes.AUTH} element={<Authentication />} />
        <Route path={routes.SHOP} element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
