import { Seccion as SeccionType, Lider } from '../types';
import Silla from './Silla';

interface SeccionProps {
    seccion: SeccionType;
    lideres: Lider[];
    onSillaClick: (sillaId: number) => void;
}

const Seccion = ({ seccion, lideres, onSillaClick }: SeccionProps) => {
    // Agrupar sillas por fila
    const sillasPorFila = seccion.sillas.reduce((acc, silla) => {
        if (!acc[silla.fila]) {
            acc[silla.fila] = [];
        }
        acc[silla.fila].push(silla);
        return acc;
    }, {} as Record<number, typeof seccion.sillas>);

    // Ordenar sillas dentro de cada fila por columna
    Object.keys(sillasPorFila).forEach(fila => {
        sillasPorFila[Number(fila)].sort((a, b) => a.columna - b.columna);
    });

    // Obtener filas ordenadas
    const filasOrdenadas = Object.keys(sillasPorFila)
        .map(Number)
        .sort((a, b) => a - b);

    // Calcular el máximo de columnas para la forma semicircular
    const maxColumnas = Math.max(...Object.values(sillasPorFila).map(fila => fila.length));

    // Calcular el total de sillas para la numeración secuencial
    let numeroSillaActual = 1;

    return (
        <div className="seccion">
            <h2>{seccion.nombre}</h2>
            <div className="seccion-contenedor">
                {filasOrdenadas.map(numeroFila => {
                    const fila = sillasPorFila[numeroFila];
                    const cantidadSillas = fila.length;

                    // Calcular el espacio vacío a cada lado para centrar la fila (efecto semicircular)
                    // A medida que las filas aumentan, el espacio disminuye (para forma de anfiteatro)
                    const espacioVacio = Math.max(0, (maxColumnas - cantidadSillas) / 2) * 0.8;

                    // Factor de escala: las filas traseras son más grandes que las delanteras
                    const filaInvertida = filasOrdenadas.length - numeroFila + 1;
                    const factorEscala = 1 + (filaInvertida - 1) * 0.03;

                    return (
                        <div
                            key={numeroFila}
                            className="fila-sillas"
                            style={{
                                paddingLeft: `${espacioVacio * 60}px`, // 60px es ancho silla + margen
                                transform: `scale(${factorEscala})`, // Cada fila es ligeramente más grande hacia atrás
                                zIndex: filasOrdenadas.length - numeroFila, // Para que las filas frontales se superpongan
                                marginBottom: numeroFila < filasOrdenadas.length ? '10px' : '30px' // Más espacio para la última fila
                            }}
                        >
                            {fila.map(silla => {
                                // Asignar número de silla secuencial
                                const numeroSilla = numeroSillaActual++;
                                return (
                                    <Silla
                                        key={silla.id}
                                        silla={silla}
                                        lideres={lideres}
                                        onSillaClick={onSillaClick}
                                        numeroSilla={numeroSilla}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
                {/* Escenario o tarima frontal */}
                <div className="tarima">
                    <div className="escenario">ESCENARIO</div>
                </div>
            </div>
        </div>
    );
};

export default Seccion; 