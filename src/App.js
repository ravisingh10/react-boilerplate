import './App.css';
import { ApplicationRouter } from './Router';
import './css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <Provider store={store}>
      <ApplicationRouter></ApplicationRouter>
    </Provider>
  );
}

export default App;
