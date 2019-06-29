<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
/*#062399 #775C9E*/
html, body, #app {
  height: 100%;
  background-color: #fafafa;
  font-family: Calibri, sans;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #775C9E;
}

#nav a.router-link-active {
  color: #062399;
  text-decoration: underline;
}

#nav a:hover {
  color: orange;
}
</style>
