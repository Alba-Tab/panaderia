import { useState, useEffect } from 'react';
import axios from 'axios';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
 const fetchFacturas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/facturas');
                
                if (Array.isArray(response.data)) {
                    setFacturas(response.data);
                } else {
                    setError('Formato de datos incorrecto');
                }
            } catch (err) {
                setError('Error al cargar las facturas');
            } finally {
                setLoading(false);
            }
        };

        fetchFacturas();
    }, []);

    if (loading) {
        return <p>Cargando facturas...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Últimas Facturas</h2>
            <ul>
                {facturas.length > 0 ? (
                    facturas.map(factura => (
                        <li key={factura.id_factura}>
                            Cliente: {factura.nombre_cliente}, Total: {factura.total}, Fecha: {factura.fecha}
                        </li>
                    ))
                ) : (
                    <li>No hay facturas disponibles.</li>
                )}
            </ul>
        </div>
    );
};

export default Facturas;
