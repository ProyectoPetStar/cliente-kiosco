

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



export{
    notify
}