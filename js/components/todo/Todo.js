export default class Todo {
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.completed = data.completed;
        this.createdAt = data.createdAt;
    }
    render(domElt) {
        const newTodo = document.createElement("div");
        newTodo.innerHTML = getTemplate(this);
        domElt.append(newTodo);
    }
}