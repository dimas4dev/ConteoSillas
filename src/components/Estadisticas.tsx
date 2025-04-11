import { Lider, Seccion } from '../types';

interface EstadisticasProps {
    secciones: Seccion[];
    lideres: Lider[];
}

const Estadisticas = ({ secciones, lideres }: EstadisticasProps) => {
    // Obtener todas las sillas de todas las secciones
    const todasLasSillas = secciones.flatMap(seccion => seccion.sillas);

    // Total de sillas
    const totalSillas = todasLasSillas.length;

    // Sillas ocupadas por cada líder
    const sillasPorLider = lideres.map(lider => {
        const cantidad = todasLasSillas.filter(silla => silla.ocupadaPor === lider.id).length;
        return {
            lider,
            cantidad,
            porcentaje: (cantidad / totalSillas) * 100
        };
    });

    // Total de sillas ocupadas
    const totalOcupadas = todasLasSillas.filter(silla => silla.ocupadaPor !== null).length;

    // Porcentaje de ocupación total
    const porcentajeOcupacion = (totalOcupadas / totalSillas) * 100;

    return (
        <div className="estadisticas">
            <h3>Estadísticas de ocupación</h3>
            <p>Total de sillas: {totalSillas}</p>
            <p>Sillas ocupadas: {totalOcupadas} ({porcentajeOcupacion.toFixed(1)}%)</p>
            <h4>Distribución por líder:</h4>
            <ul>
                {sillasPorLider.map(({ lider, cantidad, porcentaje }) => (
                    <li key={lider.id} style={{ color: lider.color }}>
                        {lider.nombre}: {cantidad} sillas ({porcentaje.toFixed(1)}%)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Estadisticas; 