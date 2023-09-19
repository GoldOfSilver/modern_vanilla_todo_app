import getTemplate from './template.js';
import "./styles.scss";
import DB from '../../DB.js';
import Todo from '../todo/Todo.js';

// Création de la classe TodoList
// Avec comme propriétée:
// domElt, todo qui doit contenir des objets de type Todo

export default class TodoList {
    constructor(data) {
        DB.setApiURL(data.apiURL)
        this.domElt = document.querySelector(data.domElt);
        this.todos = []
        this.loadTodos();
    }

    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }

    render() {
        this.domElt.innerHTML = getTemplate(this);
    }
}