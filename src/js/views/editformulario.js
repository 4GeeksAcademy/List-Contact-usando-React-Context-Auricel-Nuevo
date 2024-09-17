import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { useNavigate } from "react-router-dom";

const Editformulario = () => {
    // Obtener el parámetro 'id' desde la URL
    const { id } = useParams();  
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Estado para manejar los datos del contacto
    const [contacto, setContacto] = useState({});

    // Función para manejar los cambios en los campos del formulario
    const manejarCambio = (evento) => {
        setContacto({ ...contacto, [evento.target.name]: evento.target.value });
    };

    // Cargar los datos del contacto cuando el componente se monta
    useEffect(() => {
		if (id) {
			const contactoAEditar = store.contactos.find(contacto => contacto.id );
			if (contactoAEditar) {
				setContacto(contactoAEditar);  // Actualizar el estado con los datos del contacto
			}
		}
	}, [id, store.contactos]);
	

    // Función para Editar el guardado de los cambios
    const editarContacto = async (evento) => {
        evento.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Auricel/contacts/${id}`,
                {
                    method: "PUT",  // Usar PUT para actualizar el contacto
                    body: JSON.stringify(contacto),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            const data = await response.json();
            if (data) {
                // Actualizar los contactos en el store y redirigir a la lista principal
                actions.obtenerContactos();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fullscreen-background">
            <div className="container">
                <h1>Editar Contacto</h1>
                <form onSubmit={editarContacto}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={contacto.name}  // Asignar el valor del contacto
                            onChange={manejarCambio}  // Manejar los cambios
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={contacto.email}  // Asignar el valor del contacto
                            onChange={manejarCambio}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={contacto.phone}  // Asignar el valor del contacto
                            onChange={manejarCambio}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={contacto.address}  // Asignar el valor del contacto
                            onChange={manejarCambio}
                        />
                    </div>

                    <button type="submit" className="btn btn-success mb-2">
                        Guardar Cambios
                    </button>

                    <p><Link to="/">
                        <span className="navbar-brand mb-0 h1">Ir a mi lista de contactos</span>
                    </Link></p>
                </form>
            </div>
        </div>
    );
};

export default Editformulario;
