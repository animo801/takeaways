import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import charlieBrown from './charlieBrown'
import interview from './interview'
import login from './login'

//Listen up sir. This is important. The order of the things below needs to be in order.
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={login}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/:id/:interviewName' component={interview}/>
      <Route path='/:id' component={charlieBrown}/>
      <Route component = {Home}/>
      
    </Switch>
  </main>
)

export default Main
