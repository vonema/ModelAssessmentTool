<template>
  <div id="app">
    <div id="nav">
      <!--Import fontawesome!-->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
          crossorigin="anonymous">
      <h3>
        <router-link to="/pdf">Feedback tool</router-link> |
        <router-link to="/database">Database</router-link></h3>
    </div>
    <router-view/>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
    margin-left: 160px;
    padding: 30px 10px;
    background-color: #111;
}

#nav a {
  font-weight: bold;
  color: #4e5e6e;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@import './styles/sidebar.css'; 
@import './styles/slider.css'; 
@import './styles/icons.css'; 

</style>
