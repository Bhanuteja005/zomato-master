import './App.css';
import HomeLayoutHOC from './HOC/Home.HOC';

//component
import Master from './Components/master';
import Temp from './Components/temp';

function App() {
  return (
   <>
    <HomeLayoutHOC path="/" exact component={Temp} />
    <HomeLayoutHOC path="/:type" exact component={Master} />
   </>
  );
}

export default App;
