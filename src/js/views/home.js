import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log(store.contactos);

  return (
    <div className="container">
  {/* Botón para agregar contactos */}
  <div className="Boton-agregar text-center mb-4 p-3">
    <Link to="/agregar-contacto">
      <button className="btn btn-primary">Agregar Contacto</button>
    </Link>
  </div>

  {/* Título centrado */}
  <div className="titulo text-center mb-4">
    <h1>Mi lista de contactos</h1>
  </div>

  {/* Mapeo de los contactos Aqui ese recorriendo (como un bucle) todos los contactos que estan
   guardados en la store (flux)*/}
  <div className="contactos">
    {store.contactos.map((contacto) => {
      return (
        <div className="contacto d-flex mb-4 row align-items-start" key={contacto.email}>
          
          {/* Imagen del contacto */}
          <div className="col-12 col-sm-3 text-center mb-3">
            <img className="foto img-fluid rounded-circle" 
                 src="https://cdn.awsli.com.br/600x1000/761/761999/produto/1482058586e9ba7b002.jpg" 
                 alt="foto de contacto" />
          </div>

          {/* Datos del contacto */}
          <div className="datos col-12 col-sm-7">
            <h3 className="nombre mb-3">{contacto.name}</h3>
            <p><i className="fa-solid fa-phone"></i> {contacto.phone}</p>
            <p><i className="fa-solid fa-envelope"></i> {contacto.email}</p>
            <p><i className="fa-solid fa-location-dot"></i> {contacto.address}</p>
          </div>

          {/* Botones de acciones */}
          <div className="botones col-12 col-sm-2 d-flex justify-content-end">
            <Link to={`/editar-formulario/${contacto.id}`}>
              <i className="fa-solid fa-pencil me-3" style={{ color: 'blue', cursor: 'pointer' }}></i>
            </Link>
            <i className="fa-solid fa-trash" style={{ color: 'blue', cursor: 'pointer' }}
               onClick={() => actions.deleteContactos(contacto.id)}></i>
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
};
