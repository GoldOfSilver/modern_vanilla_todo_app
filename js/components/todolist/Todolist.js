import getTemplate from './template.js';
import DB from '../../DB.js';
import Todo from '../todo/Todo.js';

// Création de la classe TodoList
// Avec comme propriétée:
// domElt, todo qui doit contenir des objets de type Todo

export default class TodoList {
    constructor(data) {
        DB.setApiURL(data.apiURL)
        this.domElt = document.querySelector(data.domElt);
        this.todos = [];
        this.newTodoInput = null;
        this.loadTodos();
    }

    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }

    render() {
        this.domElt.innerHTML = getTemplate(this);
        this.activeElements();
        this.renderNotCompletedTodoCount();
    }

    activeElements() {
        this.newTodoInput = this.domElt.querySelector('.new-todo');
        
        this.filterAll = this.domElt.querySelector('.filters a[href="#/"]');
        this.filterActive = this.domElt.querySelector('.filters a[href="#/active"]');
        this.filterCompleted = this.domElt.querySelector('.filters a[href="#/completed"]');

        // Code pour capturé l'évenement pour ajouter une todo et on lui envoie la value
        this.newTodoInput.onkeyup = (e) => {
            if(e.code === "Enter" && this.newTodoInput.value != '') {
              this.add(this.newTodoInput.value);
            }
        };
        
        // Filtres
        this.filterAll.addEventListener('click', () => this.filterTodos('all'));
        this.filterActive.addEventListener('click', () => this.filterTodos('active'));
        this.filterCompleted.addEventListener('click', () => this.filterTodos('completed'));
    }

    renderNotCompletedTodoCount() {
        this.domElt.querySelector('.todo-count strong').innerHTML = 
            this.todos.filter((todo) => !todo.completed).length;
    }

    // Méthode pour ajouter une todo
    add (data) {
        // 1. Ajout de la todo dans le this.todos
        const todo = {
            id: Date.now(),
            content: data,
            completed: false
        };
        const newTodo = new Todo(todo);
        this.todos.unshift(newTodo);
        
        // 2. Ajout de la todo dans le DOM
        // this.elt.querySelector('.todo-list').innerHTML = 
        // newTodo.render() + this.elt.querySelector('.todo-list').innerHTML;

        // Créer l'élément
        // Mettre le render dedans
        // faire un insertBefore
        const newTodoElement = document.createElement('div');
        document.querySelector('.todo-list').insertBefore(newTodoElement,document.querySelector('.todo-list').children[0]);
        newTodoElement.outerHTML = newTodo.render();

        // 3. Ajout de la todo dans l'API
        DB.addOne(todo);

        // 4. Je vide l'input
        this.newTodoInput.value = '';
    
        // Je recompte les not completed
        this.renderNotCompletedTodoCount();
    }

    filterTodos(filterType) {
        const allTodos = this.domElt.querySelectorAll('.todo-list li');
        const filters = this.domElt.querySelectorAll('.filters a');filters.forEach(filter => filter.classList.remove('selected'));

        allTodos.forEach(todo => {
            const isCompleted = todo.classList.contains('completed');
            switch (filterType) {
                
                case 'all':
                    todo.style.display = '';
                    this.domElt.querySelector('.filters a[href="#/"]').classList.add('selected');
                break;
                    
                case 'active':
                    todo.style.display = isCompleted ? 'none' : '';this.domElt.querySelector('.filters a[href="#/active"]').classList.add('selected');
                break;
                
                case 'completed':
                    todo.style.display = isCompleted ? '' : 'none';
                    this.domElt.querySelector('.filters a[href="#/completed"]').classList.add('selected');
                break;
            }
        });
    }
}