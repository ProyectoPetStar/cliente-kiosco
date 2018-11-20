import { FormControl } from "@angular/forms";


declare var $: any;


/**
 * @function notify
 * @param  {string} mjs - mensaje
 * @param  {string} type - tipo alerta
 * @return  {number} 
 * @description Regresa un numero >= 0 si encuentra el elemento que se esta buscando
 */
function notify (mjs, type, delay): void {
    $.notify({
        message: '<p style="font-size:.9em">'+mjs+'</p>'
    },{
        // settings
        element: 'body',
        type: type,
        allow_dismiss: true,
        delay: delay,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: function() {
            this.css({'width':'auto','height':'auto'});
        },
    });
   
}

/**
 * @function isValidId
 * @param  {any} id -   Parametro recuperado en la url
 * @return  {boolean} 
 * @description funcion utilizada para verificar que sea un número lo que se manda por la url
 * cuando se va editar un registro en un formulario
 */
function isValidId(id: any): boolean {
    return /^[0-9]+$/.test(id);
}

/**
 * @function getCatalogoEstados
 * @return  {Array} 
 * @description Contiene el listado de Estados registrados actualmente en México
 */
function getCatalogoEstados(): Array<any> {
    return [
        { "id": 1, "name": "AGUASCALIENTES" },
        { "id": 2, "name": "BAJA CALIFORNIA" },
        { "id": 3, "name": "BAJA CALIFORNIA SUR" },
        { "id": 4, "name": "CAMPECHE" },
        { "id": 5, "name": "COAHUILA" },
        { "id": 6, "name": "COLIMA" },
        { "id": 7, "name": "CHIAPAS" },
        { "id": 8, "name": "CHIHUAHUA" },
        { "id": 9, "name": "DISTRITO FEDERAL" },
        { "id": 10, "name": "DURANGO" },
        { "id": 11, "name": "GUANAJUATO" },
        { "id": 12, "name": "GUERRERO" },
        { "id": 13, "name": "HIDALGO" },
        { "id": 14, "name": "JALISCO" },
        { "id": 15, "name": "EDO. MÉXICO" },
        { "id": 16, "name": "MICHOACÁN"},
        { "id": 17, "name": "MORELOS" },
        { "id": 18, "name": "NAYARIT" },
        { "id": 19, "name": "NUEVO LEÓN" },
        { "id": 20, "name": "OAXACA" },
        { "id": 21, "name": "PUEBLA" },
        { "id": 22, "name": "QUERÉTARO" },
        { "id": 23, "name": "QUINTANA ROO" },
        { "id": 24, "name": "SAN LUIS POTOSÍ" },
        { "id": 25, "name": "SINALOA" },
        { "id": 26, "name": "SONORA" },
        { "id": 27, "name": "TABASCO" },
        { "id": 28, "name": "TAMAULIPAS" },
        { "id": 29, "name": "TLAXCALA" },
        { "id": 30, "name": "VERACRUZ" },
        { "id": 31, "name": "YUCATÁN" },
        { "id": 32, "name": "ZACATECAS" }
    ];
}

function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}



export{
    notify,
    isValidId,
    getCatalogoEstados,
    noWhitespaceValidator

}