import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
	
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [contacto, setContacto] = useState({})
	const manejarCambio = (evento) => {
		setContacto({ ...contacto, [evento.target.name]: evento.target.value })
	}


	const manejarGuardar = async (evento) => {
		evento.preventDefault();
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/Auricel/contacts",
				{
					method: "POST",
					body: JSON.stringify(contacto),
					headers: {
						"Content-Type": "application/json"
					}
				})

			const data = await response.json()
			/* Hace que Al Agregar contactos en guardar me dirija a la pagina proncial con mi lista de contacto actualizado,
			para que esto sucediera llamo al import { useNavigate } from "react-router-dom"; y hago const navigate = useNavigate() */
			
			if (data){
				actions.obtenerContactos()
				navigate("/")
			}

		} catch (error) {
			console.log(error);

		}
	}
	
	return (

		<div className="fullscreen-background">
			<div className="container">
				<h1>Formulario de contacto</h1>
				<form >
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							onChange={(e) => {
								manejarCambio(e)
							}}
							type="text"
							className="form-control"
							id="name"
							name="name" />
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							onChange={(e) => {
								manejarCambio(e)
							}}
							type="email"
							className="form-control"
							id="email"
							aria-describedby="emailHelp"
							name="email" />
						<div id="emailHelp" className="form-text"></div>
					</div>
					<div className="mb-3">
						<label htmlFor="phone" className="form-label">
							Telefono
						</label>
						<input onChange={(e) => {
							manejarCambio(e)
						}}
							type="number"
							className="form-control"
							id="telefono"
							name="phone" />
					</div>
					<div className="mb-3">
						<label htmlFor="direccion" className="form-label">
							Direccion
						</label>
						<input onChange={(e) => {
							manejarCambio(e)
						}}
							type="text"
							className="form-control"
							id="direccion"
							name="address" />
					</div>
					<button type="submit" className="btn btn-success mb-2" onClick={manejarGuardar}>
						Guardar
					</button>

					<p><Link to="/">
						<span className="navbar-brand mb-0 h1">Ir a mi lista de contactos</span>
					</Link></p>

				</form>

			</div>
		</div>
	)


};



