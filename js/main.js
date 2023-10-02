import '../style.scss';
import TodoList from './components/todolist/Todolist.js';

// instancier une nouvelle Todolist
// en lui envoyant l'élément DOM sur lequel se greffer
// et l'URL de l'API à utiliser

window.todoList = new TodoList({
    apiURL: "https://650449e0c8869921ae24cfd0.mockapi.io",
    domElt: "#app"
});