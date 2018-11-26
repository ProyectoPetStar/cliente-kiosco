export class App {
    constructor(
        public id_url_kiosko: number,
        public descripcion: string,
        public imagen: string,
        public nombre: string ,
        public url: string,
        public activo: number,
        public id_usuario_registro?: number,
        public fecha_registro?: string,
        public id_usuario_modifica_registro?: number,
        public fecha_modifica_registro?: string,
        public fecha_registro_string?: string,
        public fecha_modifica_registro_string?: string
    ){}
}
