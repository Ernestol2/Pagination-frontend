import './App.css'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Products from './components/Products'
import AddProduct from './components/AddProduct'
import Update from './components/Update'
import Filter from './components/Filter'

function App() {


  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={ Filter } />
        <Route path="/products" component={ Products } />
        <Route path="/create-product" component={ AddProduct } />
        <Route path="/update/:productId" component={ Update } />
      </Switch>
    </> 
  )
}

export default App
