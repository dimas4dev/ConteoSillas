import './App.css'
import { ReactNode } from 'react'

interface Area {
  id: string
  nombre: string
}

interface Silla {
  id: number
  fila: number
  columna: number
  subseccion?: number
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
  const crearSillasTriangular = () => {
    const sillas: Silla[] = []
    // Para 570 sillas en forma triangular, necesitamos aproximadamente 30 filas
    const numFilas = 30
    let idSilla = 1

    // Calculamos cuántas sillas por fila para mantener la forma triangular
    for (let fila = 0; fila < numFilas; fila++) {
      // La primera fila tendrá 19 sillas, y cada fila siguiente tendrá una silla menos
      const sillasEnEstaFila = 19 - fila
      if (sillasEnEstaFila <= 0) break // Si ya no hay sillas que agregar, terminamos

      for (let columna = 0; columna < sillasEnEstaFila; columna++) {
        sillas.push({
          id: idSilla++,
          fila,
          columna: columna + fila // Desplazamiento para alinear a la derecha
        })
      }
    }
    return sillas
  }

  const crearSillasRectangularPorSeccion = (numSillas: number, numFilas: number, startId: number = 1, subseccion: number = 1) => {
    const sillas: Silla[] = []
    const sillasXFila = Math.ceil(numSillas / numFilas)
    let idSilla = startId

    for (let fila = 0; fila < numFilas && idSilla < startId + numSillas; fila++) {
      for (let columna = 0; columna < sillasXFila && idSilla < startId + numSillas; columna++) {
        sillas.push({
          id: idSilla++,
          fila,
          columna,
          subseccion
        })
      }
    }
    return sillas
  }

  const renderizarAreaBottomLeft = () => {
    const sillas = crearSillasTriangular()
    const filas: ReactNode[] = []
    const maxFilas = Math.max(...sillas.map(s => s.fila)) + 1

    // Agrupar sillas por fila
    for (let i = 0; i < maxFilas; i++) {
      const sillasEnFila = sillas.filter(s => s.fila === i)
      if (sillasEnFila.length === 0) continue

      filas.push(
        <div key={`fila-${i}`} className="fila-triangular">
          {sillasEnFila.map(silla => (
            <div key={silla.id} className="silla">
              {silla.id}
            </div>
          ))}
        </div>
      )
    }

    return filas
  }

  const renderizarAreaBottomCenter = () => {
    // Primera subsección: 95 sillas en 5 filas
    const sillasSubseccion1 = crearSillasRectangularPorSeccion(95, 5, 1, 1)
    // Segunda subsección: 246 sillas en 16 filas
    const sillasSubseccion2 = crearSillasRectangularPorSeccion(246, 16, 96, 2)

    const renderizarSubseccion = (sillas: Silla[], titulo: string) => {
      const maxFilas = Math.max(...sillas.map(s => s.fila)) + 1
      const filas: ReactNode[] = []

      for (let i = 0; i < maxFilas; i++) {
        const sillasEnFila = sillas.filter(s => s.fila === i)
        if (sillasEnFila.length === 0) continue

        filas.push(
          <div key={`fila-${i}`} className="fila-rectangular">
            {sillasEnFila.map(silla => (
              <div key={silla.id} className="silla">
                {silla.id}
              </div>
            ))}
          </div>
        )
      }

      return (
        <div className="subseccion">
          <div className="subseccion-titulo">{titulo}</div>
          <div className="subseccion-sillas">
            {filas}
          </div>
        </div>
      )
    }

    return (
      <>
        {renderizarSubseccion(sillasSubseccion1, "Subsección 1")}
        {renderizarSubseccion(sillasSubseccion2, "Subsección 2")}
      </>
    )
  }

  return (
    <div className="container">
      <h1>Auditorio Principal</h1>
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
    </div>
  )
}

export default App
