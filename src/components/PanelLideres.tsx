import { Lider } from '../types';

interface PanelLideresProps {
    lideres: Lider[];
    liderSeleccionado: number | null;
    onLiderSelect: (liderId: number | null) => void;
    onConfirmar: () => void;
}

const PanelLideres = ({ lideres, liderSeleccionado, onLiderSelect, onConfirmar }: PanelLideresProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onLiderSelect(value === '' ? null : Number(value));
    };

    const liderActual = liderSeleccionado ? lideres.find(l => l.id === liderSeleccionado) : null;

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
        </div>
    );
};

export default PanelLideres; 