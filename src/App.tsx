import './App.css'
import { ReactNode, useState, useEffect } from 'react'
import ModalPanelLideres from './components/ModalPanelLideres'
import { Lider } from './types'
import SillaComponent from './components/Silla'

interface Area {
  id: string
  nombre: string
}

interface Silla {
  id: number
  fila: number
  columna: number
  subseccion?: number
  ocupadaPor: number | null
}

const areas: Area[] = [
  { id: 'top-left', nombre: 'Superior Izquierda' },
  { id: 'top-center', nombre: 'Superior Central' },
  { id: 'top-right', nombre: 'Superior Derecha' },
  { id: 'left', nombre: 'Izquierda' },
  { id: 'right', nombre: 'Derecha' },
  { id: 'bottom-left', nombre: 'Inferior Izquierda' },
  { id: 'bottom-center', nombre: 'Inferior Central' },
  { id: 'bottom-right', nombre: 'Inferior Derecha' }
]

function App() {
  const [isPanelLideresOpen, setIsPanelLideresOpen] = useState(false);
  const [liderSeleccionado, setLiderSeleccionado] = useState<number | null>(null);
  const [sillas, setSillas] = useState<Silla[]>([]);
  const [lideres] = useState<Lider[]>([
    { id: 1, nombre: 'Cesar y Maria Isabel Medina', color: '#FF6B6B' },
    { id: 2, nombre: 'Jonathan y Tatiana Hernandez', color: '#4ECDC4' },
    { id: 3, nombre: 'Manuel y Maireth Renteria', color: '#45B7D1' },
    { id: 4, nombre: 'Mauricio y Monica Patiño', color: '#96CEB4' },
    { id: 5, nombre: 'Giovanni y Andrea Santamaria', color: '#D4A5A5' },
    { id: 6, nombre: 'Felipe y Viviana Parra', color: '#9B59B6' },
    { id: 7, nombre: 'Samir y Ana Vera', color: '#3498DB' },
    { id: 8, nombre: 'Diego y Maria Rojas', color: '#E67E22' },
    { id: 9, nombre: 'Andres y Judy Guzmán', color: '#2ECC71' },
    { id: 10, nombre: 'John y Viviana Cantillo', color: '#F1C40F' },
    { id: 11, nombre: 'Daniel y Mariana Durán', color: '#E74C3C' },
    { id: 12, nombre: 'Jouseph y Viviana', color: '#1ABC9C' },
    { id: 13, nombre: 'Gustavo y Sandra Mireles', color: '#8E44AD' },
    { id: 14, nombre: 'Jahems Y Esneth Ordoñez', color: '#D35400' },
  ]);

  useEffect(() => {
    const sillasTriangulares = crearSillasTriangular();
    const sillasRectangulares1 = crearSillasRectangularPorSeccion(95, 5, sillasTriangulares.length + 1);
    const sillasRectangulares2 = crearSillasRectangularPorSeccion(246, 16, sillasTriangulares.length + sillasRectangulares1.length + 1);

    setSillas([...sillasTriangulares, ...sillasRectangulares1, ...sillasRectangulares2]);
  }, []);

  const handleSillaClick = (sillaId: number) => {
    if (liderSeleccionado !== null) {
      setSillas(prevSillas => prevSillas.map(silla =>
        silla.id === sillaId
          ? { ...silla, ocupadaPor: liderSeleccionado }
          : silla
      ));
    }
  };

  const handleConfirmarLider = () => {
    setIsPanelLideresOpen(false);
  };

  const crearSillasTriangular = () => {
    const sillasNuevas: Silla[] = [];
    const numFilas = 30;
    let idSilla = 1;

    for (let fila = 0; fila < numFilas; fila++) {
      const sillasEnEstaFila = 19 - fila;
      if (sillasEnEstaFila <= 0) break;

      for (let columna = 0; columna < sillasEnEstaFila; columna++) {
        sillasNuevas.push({
          id: idSilla++,
          fila,
          columna: columna + fila,
          ocupadaPor: null
        });
      }
    }
    return sillasNuevas;
  };

  const crearSillasRectangularPorSeccion = (numSillas: number, numFilas: number, startId: number = 1) => {
    const sillasNuevas: Silla[] = [];
    const sillasXFila = Math.ceil(numSillas / numFilas);
    let idSilla = startId;

    for (let fila = 0; fila < numFilas && idSilla < startId + numSillas; fila++) {
      for (let columna = 0; columna < sillasXFila && idSilla < startId + numSillas; columna++) {
        sillasNuevas.push({
          id: idSilla++,
          fila,
          columna,
          ocupadaPor: null
        });
      }
    }
    return sillasNuevas;
  };

  const renderizarSilla = (silla: Silla) => {
    const sillaActualizada = sillas.find(s => s.id === silla.id) || silla;

    return (
      <SillaComponent
        key={silla.id}
        silla={sillaActualizada}
        lideres={lideres}
        onSillaClick={handleSillaClick}
        numeroSilla={silla.id}
      />
    );
  };

  const renderizarAreaBottomLeft = () => {
    const sillasFila = sillas.filter(s => s.id <= crearSillasTriangular().length);
    const filas: ReactNode[] = [];
    const maxFilas = Math.max(...sillasFila.map(s => s.fila)) + 1;

    for (let i = 0; i < maxFilas; i++) {
      const sillasEnFila = sillasFila.filter(s => s.fila === i);
      if (sillasEnFila.length === 0) continue;

      filas.push(
        <div key={`fila-${i}`} className="fila-triangular">
          {sillasEnFila.map(renderizarSilla)}
        </div>
      );
    }

    return filas;
  };

  const renderizarAreaBottomCenter = () => {
    const totalSillasTriangulares = crearSillasTriangular().length;
    const sillasSubseccion1 = sillas.slice(
      totalSillasTriangulares,
      totalSillasTriangulares + 95
    );
    const sillasSubseccion2 = sillas.slice(
      totalSillasTriangulares + 95
    );

    const renderizarSubseccion = (sillasSeccion: Silla[], titulo: string) => {
      const maxFilas = Math.max(...sillasSeccion.map(s => s.fila)) + 1;
      const filas: ReactNode[] = [];

      for (let i = 0; i < maxFilas; i++) {
        const sillasEnFila = sillasSeccion.filter(s => s.fila === i);
        if (sillasEnFila.length === 0) continue;

        filas.push(
          <div key={`fila-${i}`} className="fila-rectangular">
            {sillasEnFila.map(renderizarSilla)}
          </div>
        );
      }

      return (
        <div key={titulo} className="subseccion">
          <div className="subseccion-titulo">{titulo}</div>
          <div className="subseccion-sillas">
            {filas}
          </div>
        </div>
      );
    };

    return (
      <>
        {renderizarSubseccion(sillasSubseccion1, "Subsección 1")}
        {renderizarSubseccion(sillasSubseccion2, "Subsección 2")}
      </>
    );
  };

  const liderActual = liderSeleccionado ? lideres.find(l => l.id === liderSeleccionado) : null;

  return (
    <div className="container">
      <div className="title-container">
        <h1>Auditorio Principal</h1>
        <button
          className="panel-lideres-button"
          onClick={() => setIsPanelLideresOpen(true)}
        >
          Panel de Líderes
        </button>
      </div>
      {liderActual && (
        <div className="lider-activo">
          Líder seleccionado:
          <span className="nombre-lider">{liderActual.nombre}</span>
          <div
            className="color-indicator"
            style={{ backgroundColor: liderActual.color }}
          ></div>
        </div>
      )}
      <div className="seccion-wrapper">
        <div className="seccion">
          {areas.map(area => (
            <div key={area.id} className={`area-sillas area-${area.id}`}>
              {area.id === 'bottom-left' ? (
                renderizarAreaBottomLeft()
              ) : area.id === 'bottom-center' ? (
                renderizarAreaBottomCenter()
              ) : (
                area.nombre
              )}
            </div>
          ))}
          <div className="escenario">ESCENARIO</div>
        </div>
      </div>
      <ModalPanelLideres
        isOpen={isPanelLideresOpen}
        onClose={() => setIsPanelLideresOpen(false)}
        lideres={lideres}
        liderSeleccionado={liderSeleccionado}
        onLiderSelect={setLiderSeleccionado}
        onConfirmar={handleConfirmarLider}
        sillas={sillas}
      />
    </div>
  )
}

export default App
