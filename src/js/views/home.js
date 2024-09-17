import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log(store.contactos);

  return (
    <div className= "container ">
      {/* Botón para agregar contactos */}
      <div className="Boton-agregar">
        <Link to="/agregar-contacto">
          <button className="btn btn-primary">Agregar Contacto</button>
        </Link>
      </div>

      {/* Título centrado */}
      <div className="titulo">
        <h1>Mi lista de contactos</h1>
      </div>

      {/* Mapeo de los contactos */}
      <div className="contactos">
        {store.contactos.map((contacto) => {
          return (
            <div className="contacto d-flex mb-1" key={contacto.email}>

              <div>
                <img className="foto ms-2 md-2" src="https://cdn.awsli.com.br/600x1000/761/761999/produto/1482058586e9ba7b002.jpg" alt="foto de contacto" />
              </div>

              
              <div className="iconos datos ms-8 md-8">
               <h3 className="nombre mb-4">{contacto.name}</h3>
                <p>
                  <i className="fa-solid fa-phone"></i> {contacto.phone}
                </p>
                <p>
                  <i className="fa-solid fa-at"></i> {contacto.email}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot"></i> {contacto.address}
                </p>

                <div className="botones d-flex justify-content-center ms-2 md-2  ms-auto">
                  
                 <Link to={`/editar-formulario/${contacto.id}`}>
                  <i className="fa-solid fa-pencil me-3" 
                  style={{ color: 'blue' }}
                  ></i> 
                  </Link>
                  


                  <i className="fa-solid fa-trash"
                    style={{ color: 'blue' }}
                    onClick={() => actions.deleteContactos(contacto.id)} // Elimina contacto por su id
                  ></i>


                </div>



              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
