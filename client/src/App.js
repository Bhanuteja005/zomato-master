import './App.css';
import HomeLayoutHOC from './HOC/Home.HOC';

//component
import Temp from './Components/temp';

function App() {
  return (
   <>
    <HomeLayoutHOC path="/" exact component={Temp} />
   
   </>
  );
}

export default App;
