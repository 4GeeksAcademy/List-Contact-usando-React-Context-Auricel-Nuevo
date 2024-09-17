const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			contactos: [


			]

		},


		actions: {

			//Crear Agenda
			crearAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/Auricel", { method: "POST" });
					console.log(response);

					if (!response.ok) {
						throw new Error(`Error: ${response.status} - ${response.statusText}`);

					}
					else {
						const data = await response.json()
						if (data)
							setStore({ contactos: data.contacts })
					}

				} catch (error) {
					console.error("ha ocurrido un error", error.message);

				}

			},



			
			//Metodo Get
			obtenerContactos: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/Auricel/contacts");
					console.log(response);

					if (!response.ok) {
						throw new Error(`Error: ${response.status} - ${response.statusText}`);

					}
					else {
						const data = await response.json()
						if (data)
							setStore({ contactos: data.contacts })
					}

				} catch (error) {
					console.error("ha ocurrido un error", error.message);
					getActions().crearAgenda();

				}
			

			},


			// manejarGuardar : async (evento) => {
			// 	evento.preventDefault();
			// 	try {
			// 		const response = await fetch("https://playground.4geeks.com/contact/agendas/Auricel/contacts",
			// 			{
			// 				method: "POST",
			// 				body: JSON.stringify(contacto),
			// 				headers: {
			// 					"Content-Type": "application/json"
			// 				}
			// 			})
		
			// 		const data = await response.json()
			// 		/* Hace que Al Agregar contactos en guardar me dirija a la pagina proncial con mi lista de contacto actualizado,
			// 		para que esto sucediera llamo al import { useNavigate } from "react-router-dom"; y hago const navigate = useNavigate() */
					
			// 		if (data){
			// 			actions.obtenerContactos()
			// 			navigate("/")
			// 		}
		
			// 	} catch (error) {
			// 		console.log(error);
		
			// 	}

		
		
			// },

			//Editar Contacto

			// const manejarGuardar = async (evento) => {
			// 	evento.preventDefault();
			// 	try {
			// 		const response = await fetch(`https://playground.4geeks.com/contact/agendas/Auricel/contacts/${id}`,
			// 			{
			// 				method: "PUT",  // Usar PUT para actualizar el contacto
			// 				body: JSON.stringify(contacto),
			// 				headers: {
			// 					"Content-Type": "application/json"
			// 				}
			// 			});
		
			// 		const data = await response.json();
			// 		if (data) {
			// 			// Actualizar los contactos en el store y redirigir a la lista principal
			// 			actions.obtenerContactos();
			// 			navigate("/");
			// 		}
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// };
				

			deleteContactos: async (contact_Id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Auricel/contacts/${contact_Id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (response.ok) {
						const store = getStore();
						//Que hace: Obtiene el estado actual de la aplicación.
						//Como funciona: getStore() es una función que retorna el estado actual de la aplicación, el cual contiene la lista de contactos y otros datos.
						// Actualiza el estado eliminando el contacto localmente
						setStore({
							...store,
							contactos: store.contactos.filter(contacto => contacto.id !== contact_Id)
						});
						console.log("Contacto eliminado correctamente");
					} else {
						console.error("Error al eliminar el contacto");
					}
				} catch (error) {
					console.error("Hubo un error:", error);
				}
			}

		}


		//Metodo Delete

		/*const eliminarTarea = async (id) => {
	try {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.text();

		setLista(data.todos);
		console.log('ID de la tarea a eliminar:', id);

		console.log('tarea eliminada');
	} catch (error) {
		console.log('Error:', error);
	}
};*/








	}
};


export default getState;
