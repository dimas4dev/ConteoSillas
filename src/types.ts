export interface Lider {
    id: number;
    nombre: string;
    color: string;
}

export interface Silla {
    id: number;
    ocupadaPor: number | null; // ID del líder o null si está vacía
    fila: number;
    columna: number;
}

export interface Seccion {
    id: number;
    nombre: string;
    filas: number;
    columnasPorFila: number[] | number; // Puede ser un número o un array de números
    sillas: Silla[];
} 