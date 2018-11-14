import { CatalogoPerfil } from "./catalogo-perfil";

export class User {

    constructor(
        public id_usuario_kiosko: number,
        public nombre_usuario: string,
        public usuario: string,
        public imagen: string,
        public correo_electronico: string,
        public apellidos: string,
        public id_perfil: number,
        public activo: number,
        public token: string,
        public perfil: CatalogoPerfil

    ) { }
}
