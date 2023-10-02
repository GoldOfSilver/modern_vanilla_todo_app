import getTemplate from './template.js';
import DB from '../../DB.js';

export default class Todo {
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.completed = data.completed;
        this.createdAt = data.createdAt;
    }

    render() {
        this.toggleComplete
        return getTemplate(this);
    }

    toggleComplete(todoList) {
        // Modifier la propriété completed
        // Modifier dans le DOM en utilisant todoList.Domelt.querySelector et le data-id
        // Lancer le DB.updateOneById()

        // Inverse la propriété completed
        this.completed = !this.completed;

        // Met à jour l'élément dans le DOM
        const todoElement = todoList.domElt.querySelector(`li[data-id="${this.id}"]`);
        if (todoElement) {
            if (this.completed) {
                todoElement.classList.add('completed');
                const toggleCheckbox = todoElement.querySelector('.toggle');
                if (toggleCheckbox) {
                    toggleCheckbox.checked = true;
                }
            } else {
                todoElement.classList.remove('completed');
                const toggleCheckbox = todoElement.querySelector('.toggle');
                if (toggleCheckbox) {
                    toggleCheckbox.checked = false;
                }
            }
        }
        
        // Met à jour la base de données
        DB.updateOneById(this.id, { completed: this.completed });
    }

    delete () {
        // Modifier dans le DOM en utilisant todoList.Domelt.querySelector et le data-id
        // Lancer le todoList.deleteOneById() qui lance DB.deleteOneById()
    }

    // Afficher le content dans un input lorsqu'on a double-cliqué dessus
    show() {
        // Mettre le content dans un input en utilisant todoList.elt.querySelector et le data-id
    }

    update () {
        // Modifier les propriétés
        // Modifier dans le DOM en utilisant todoList.elt.querySelector et le data-id
        // Lancer le DB.updateOneById()
    }
}