using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Aplicacion;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using MVCBase.Util;

namespace MVCBase.Controllers
{
    public class TelaCrudaAcabadaController : Controller
    {
        // GET: TelaCrudaAcabada
        public ActionResult Index()
        {
            return View();
        }




        [HttpGet]
        [AllowAnonymous]
        public JsonResult ListarTCrudaMadre()
        {
            var datos = new Request<TCrudaMadre>();
            datos.entidad = new TCrudaMadre();
            var lista = new TCrudaMadreAplicacion(new TCrudaMadreRepositorio()).ListarPaginado(datos);
            //return Json(new { data = lista.response });
            var rpta = Json(new
            {
                //data = lista.response
                result = !lista.error,
                IsError = lista.error,
                Datos = JsonConvert.SerializeObject(lista.response),
                msg = lista.mensaje
            }, JsonRequestBehavior.AllowGet);
            rpta.MaxJsonLength = int.MaxValue;

            return rpta;
        }



        [HttpGet]
        [AllowAnonymous]
        public JsonResult ListarTCrudaEspecifica()
        {
            var datos = new Request<TCrudaEspecifica>();
            datos.entidad = new TCrudaEspecifica();
            var lista = new TCrudaEspecificaAplicacion(new TCrudaEspecificaRepositorio()).ListarPaginado(datos);
            //return Json(new { data = lista.response });
            var rpta = Json(new
            {
                //data = lista.response
                result = !lista.error,
                IsError = lista.error,
                Datos = JsonConvert.SerializeObject(lista.response),
                msg = lista.mensaje
            }, JsonRequestBehavior.AllowGet);
            rpta.MaxJsonLength = int.MaxValue;

            return rpta;
        }




        [HttpGet]
        [AllowAnonymous]
        public JsonResult ListarTAcabadaEspecifica()
        {
            var datos = new Request<TAcabadaEspecifica>();
            datos.entidad = new TAcabadaEspecifica();
            var lista = new TAcabadaEspecificaAplicacion(new TAcabadaEspecificaRepositorio()).ListarPaginado(datos);
            //return Json(new { data = lista.response });
            var rpta = Json(new
            {
                //data = lista.response
                result = !lista.error,
                IsError = lista.error,
                Datos = JsonConvert.SerializeObject(lista.response),
                msg = lista.mensaje
            }, JsonRequestBehavior.AllowGet);
            rpta.MaxJsonLength = int.MaxValue;

            return rpta;
        }










    }
}