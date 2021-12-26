import '../styles/index.scss';

const getTodos = () => import(/* webpackChunkName: "postsAPI" */ './api')

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    getTodos().then(({fetchTodos}) => {
        fetchTodos().then(resp => console.log(resp));
    });
});