import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";


const ElementIDs = {
	TodoList: '.todo-list',
	NewInputTodo: '#new-todo-input',
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

	// Referencias HTML
	const newDescriptionTodo = document.querySelector( ElementIDs.NewInputTodo );
	const todoListUL = document.querySelector( ElementIDs.TodoList );

	// Listeners
	newDescriptionTodo.addEventListener( 'keyup', ( event ) => {
		if ( event.keyCode !== 13 ) return;
		if ( event.target.value.trim().length === 0 ) return;

		todoStore.addTodo( event.target.value );
		displayTodos();
		event.target.value = '';

	});

	todoListUL.addEventListener( 'click', ( event ) => {
		const element = event.target.closest('[data-id]');
		todoStore.toggleTodo( element.getAttribute('data-id') );
		displayTodos();
	});
	
	todoListUL.addEventListener( 'click', ( event ) => {
		const isDestroyElement = event.target.className === 'destroy';
		const element = event.target.closest('[data-id]');
		if ( !element || !isDestroyElement ) return;

		todoStore.deleteTodo( element.getAttribute('data-id') );
		displayTodos();
	});


}
