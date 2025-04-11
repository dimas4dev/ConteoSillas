import { Silla as SillaType, Lider } from '../types';

interface SillaProps {
    silla: SillaType;
    lideres: Lider[];
    onSillaClick: (sillaId: number) => void;
    numeroSilla?: number; // Número de silla opcional para mostrar
}

const Silla = ({ silla, lideres, onSillaClick, numeroSilla }: SillaProps) => {
    const liderAsignado = silla.ocupadaPor !== null
        ? lideres.find(lider => lider.id === silla.ocupadaPor)
        : null;

    const estilo = liderAsignado
        ? { backgroundColor: liderAsignado.color }
        : {};

    // Determinar si mostrar el número de silla o la coordenada fila-columna
    const texto = numeroSilla !== undefined ? numeroSilla : `${silla.fila}-${silla.columna}`;

    return (
        <div
            className={`silla ${liderAsignado ? 'silla-ocupada' : ''}`}
            style={estilo}
            onClick={() => onSillaClick(silla.id)}
            title={`Silla ${texto}${liderAsignado ? ` - ${liderAsignado.nombre}` : ''}`}
        >
            {texto}
        </div>
    );
};

export default Silla; 