import { Lider } from '../types';
import * as XLSX from 'xlsx';

interface PanelLideresProps {
    lideres: Lider[];
    liderSeleccionado: number | null;
    onLiderSelect: (liderId: number | null) => void;
    onConfirmar: () => void;
    sillas: { id: number; fila: number; columna: number; ocupadaPor: number | null; }[];
}

const PanelLideres = ({ lideres, liderSeleccionado, onLiderSelect, onConfirmar, sillas }: PanelLideresProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onLiderSelect(value === '' ? null : Number(value));
    };

    const liderActual = liderSeleccionado ? lideres.find(l => l.id === liderSeleccionado) : null;

    const exportarExcel = () => {
        // Contar sillas por líder
        const conteoSillas = lideres.reduce((acc, lider) => {
            acc[lider.id] = sillas.filter(silla => silla.ocupadaPor === lider.id).length;
            return acc;
        }, {} as Record<number, number>);

        // Contar sillas sin asignar
        const sillasLibres = sillas.filter(silla => silla.ocupadaPor === null).length;

        // Preparar los datos para el Excel
        const datosExcel = [
            // Encabezados
            { 'Líder': 'Líder', 'Sillas Ocupadas': 'Sillas Ocupadas' },
            // Datos de cada líder
            ...lideres.map(lider => ({
                'Líder': lider.nombre,
                'Sillas Ocupadas': `${conteoSillas[lider.id]} sillas`
            })),
            // Sillas sin asignar
            { 'Líder': 'Sin Asignar', 'Sillas Ocupadas': `${sillasLibres} sillas` },
            // Total
            { 'Líder': 'Total', 'Sillas Ocupadas': `${sillas.length} sillas` }
        ];

        // Crear el libro de trabajo y la hoja
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(datosExcel, { skipHeader: true });

        // Ajustar el ancho de las columnas
        const wscols = [
            { wch: 40 }, // Líder
            { wch: 20 }, // Sillas Ocupadas
        ];
        ws['!cols'] = wscols;

        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(wb, ws, 'Resumen de Sillas');

        // Guardar el archivo
        XLSX.writeFile(wb, 'resumen_sillas.xlsx');
    };

    return (
        <div className="control-panel">
            <h3>Selecciona un líder:</h3>
            <div className="select-container">
                <select
                    value={liderSeleccionado ?? ''}
                    onChange={handleChange}
                    className="select-lider"
                    aria-label="Seleccionar líder"
                >
                    <option value="">Liberar silla</option>
                    {lideres.map(lider => (
                        <option
                            key={lider.id}
                            value={lider.id}
                            data-color={lider.color}
                        >
                            {lider.nombre}
                        </option>
                    ))}
                </select>
                <div className="color-indicator" style={{
                    backgroundColor: liderActual?.color || '#ccc'
                }}></div>
            </div>
            <button
                className="confirmar-lider-btn"
                onClick={onConfirmar}
                disabled={!liderSeleccionado}
            >
                Confirmar selección
            </button>
            <button
                className="exportar-excel-btn"
                onClick={exportarExcel}
            >
                Exportar a Excel
            </button>
        </div>
    );
};

export default PanelLideres; 