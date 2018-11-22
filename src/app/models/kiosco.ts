import { Plantas } from "./plantas";

export class Kiosco {
    constructor(
        public id_kiosko: number,
        public nombre_kiosko: string,
        public id_planta: number,
        public nombre_planta: string,
        public ip_privada: string,
        public imagen: string,
        public activo: number,
        public id_usuario_registro: number,
       
        //public id_usuario_modifica_registro: number,
       
        public fecha_registro_string: string,
        //public fecha_modifica_registro_string: string,
        public marca_kiosco: string,
        public modelo_kiosco: string,
        public planta: Plantas,
        public fecha_registro?: string,
        public fecha_modifica_registro?: string
        
    ){}
}
