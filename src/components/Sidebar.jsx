import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Panadería</h2>
            <ul>
                <li>
                    <Link to="/Dashboard">Inicio</Link>
                </li>
                <li>
                    <Link to="/facturas">Facturas</Link>
                </li>
                <li>
                    <Link to="/categorias">Categorias</Link>
                </li>
                <li>
                    <Link to="/insumos">Insumos</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

