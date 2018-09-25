import Home from './Home';
import About from './About';
import Settings from './Settings';

export default [
  {
    path: "/",
    title: 'Home',
    component: Home,
    exact: true
  },
  {
    path: "/about",
    title: 'About',
    component: About,
    exact: true
  },
  {
    path: "/settings",
    title: 'Settings',
    component: Settings,
    exact: true
  }
]