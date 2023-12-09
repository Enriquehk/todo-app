import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";


const ElementIDs = {
	TodoList: '.todo-list',
}

/**
 * App.
 *
 * @param {String} elementId
 */
export const App = ( elementId ) => {

	const displayTodos = () => {
		const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
		renderTodos( ElementIDs.TodoList, todos );
	}

	// Cuando la función App() se llama
	(()=> {
		const app = document.createElement('div');
		app.innerHTML = html;
		document.querySelector(elementId).append(app);
		displayTodos();
	})();

}