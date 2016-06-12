var Todos = Vue.extend({
    name: 'todos'
});

var vm = new Todos({
    el: '#todos', // Это инициализация
    ready: function () {
        console.log('Мы стартовали');
    }

});