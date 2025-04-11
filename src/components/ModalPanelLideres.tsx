import { Lider } from '../types';
import PanelLideres from './PanelLideres';

interface ModalPanelLideresProps {
    lideres: Lider[];
    liderSeleccionado: number | null;
    onLiderSelect: (liderId: number | null) => void;
    isOpen: boolean;
    onClose: () => void;
    onConfirmar: () => void;
    sillas: { id: number; fila: number; columna: number; ocupadaPor: number | null; }[];
}

const ModalPanelLideres = ({
    lideres,
    liderSeleccionado,
    onLiderSelect,
    isOpen,
    onClose,
    onConfirmar,
    sillas
}: ModalPanelLideresProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Panel de Líderes</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <PanelLideres
                    lideres={lideres}
                    liderSeleccionado={liderSeleccionado}
                    onLiderSelect={onLiderSelect}
                    onConfirmar={onConfirmar}
                    sillas={sillas}
                />
            </div>
        </div>
    );
};

export default ModalPanelLideres; 