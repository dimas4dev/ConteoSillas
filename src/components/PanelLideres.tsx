import { Lider } from '../types';

interface PanelLideresProps {
    lideres: Lider[];
    liderSeleccionado: number | null;
    onLiderSelect: (liderId: number | null) => void;
}

const PanelLideres = ({ lideres, liderSeleccionado, onLiderSelect }: PanelLideresProps) => {
    return (
        <div className="control-panel">
            <h3>Selecciona un líder:</h3>
            <div className="lideres">
                {lideres.map(lider => (
                    <div
                        key={lider.id}
                        className={`lider ${liderSeleccionado === lider.id ? 'seleccionado' : ''}`}
                        onClick={() => onLiderSelect(lider.id)}
                    >
                        <div
                            className="color-lider"
                            style={{ backgroundColor: lider.color }}
                        ></div>
                        <span>{lider.nombre}</span>
                    </div>
                ))}
                <div
                    className={`lider ${liderSeleccionado === null ? 'seleccionado' : ''}`}
                    onClick={() => onLiderSelect(null)}
                >
                    <div
                        className="color-lider"
                        style={{ backgroundColor: '#ccc' }}
                    ></div>
                    <span>Liberar silla</span>
                </div>
            </div>
        </div>
    );
};

export default PanelLideres; 