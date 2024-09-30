const express = require('express');

const pool = require('../db');
const router = express.Router();

router.get('/facturas', async (req, res) => {
    try{
        const result= await pool.query(`SELECT 
                fi.ide AS id_factura,
                fi.nombre AS nombre_cliente,
                fi.ci AS ci_cliente,
                fi.total AS total_factura,
                fi.fecha AS fecha_factura
            FROM 
                factura_interna fi
            ORDER BY 
                fi.fecha DESC
            LIMIT 5;`);
            res.json(result.rows);
    }catch{
        console.error('Error al cargar las facturas:', error);
        res.status(500).json({message: 'Error al cargar las facturas'});
    }
});

module.exports = router;