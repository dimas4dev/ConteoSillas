export interface Lider {
    id: number;
    nombre: string;
    color: string;
}

export interface Silla {
    id: number;
    fila: number;
    columna: number;
    ocupadaPor: number | null;
}

export interface Seccion {
    id: number;
    nombre: string;
    filas: number;
    columnasPorFila: number[] | number; // Puede ser un número o un array de números
    sillas: Silla[];
} 