export class User {

    constructor(
        public id_usuario_kiosko: number,
        public nombre_usuario: string,
        public usuario: string,
        public imagen_administrador: string,
        public id_perfil: number,
        public descripcion: string,
        public activo: number,
        public token: string
    ) { }
}
