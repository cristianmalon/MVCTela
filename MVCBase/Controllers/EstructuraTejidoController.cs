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
    public class EstructuraTejidoController : Controller
    {
        // GET: EstructuraTejido
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public JsonResult ListarEstructuraTej_all()
        {
            var datos = new Request<ETJB01>();
            datos.entidad = new ETJB01();
            var lista = new ETJB01Aplicacion(new ETJB01Repositorio()).ListarPaginado(datos);
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

        [HttpPost]
        [AllowAnonymous]
        public JsonResult InsertEstructuraTej(ETJB01 entidad)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    Response response = new Response();
                    var datos = new Request<ETJB01>();
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    datos.entidad = entidad;
                    response = new ETJB01Aplicacion(new ETJB01Repositorio()).Insertar(datos);

                    return Json(new
                    {
                        rpta = response.Success,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = response.Success ? Utiles.MessageSaveSuccess() : response.mensaje,
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new
                    {
                        rpta = false,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = Utiles.MessageServerError() + " - " + ex.Message.ToString(),
                        //combo = 0
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    rpta = false,
                    errores = Utiles.GetErrorsFromModelState(this.ModelState),
                    url = Url.Action("Index"),
                    result = Utiles.MessageModelStateInvalid()
                }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPut]
        [AllowAnonymous]
        public JsonResult UpdateEstrucTej(ETJB01 entidad)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Response response = new Response();
                    var datos = new Request<ETJB01>();
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    datos.entidad = entidad;
                    response = new ETJB01Aplicacion(new ETJB01Repositorio()).Actualizar(datos);

                    return Json(new
                    {
                        rpta = response.Success,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = response.Success ? Utiles.MessageSaveSuccess() : response.mensaje,
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new
                    {
                        rpta = false,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = Utiles.MessageServerError() + " - " + ex.Message.ToString(),
                        //combo = 0
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    rpta = false,
                    errores = Utiles.GetErrorsFromModelState(this.ModelState),
                    url = Url.Action("Index"),
                    result = Utiles.MessageModelStateInvalid()
                }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpDelete]
        [AllowAnonymous]
        public JsonResult DeleteEstrucTej(ETJB01 entidad)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Response response = new Response();
                    var datos = new Request<ETJB01>();
                    datos.entidad = entidad;
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    response = new ETJB01Aplicacion(new ETJB01Repositorio()).Eliminar(datos);

                    return Json(new
                    {
                        rpta = response.Success,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = response.Success ? Utiles.MessageSaveSuccess() : response.mensaje,
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new
                    {
                        rpta = false,
                        errores = Utiles.GetErrorsFromModelState(this.ModelState),
                        url = Url.Action("Index"),
                        result = Utiles.MessageServerError() + " - " + ex.Message.ToString(),
                        //combo = 0
                        id = 0
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    rpta = false,
                    errores = Utiles.GetErrorsFromModelState(this.ModelState),
                    url = Url.Action("Index"),
                    result = Utiles.MessageModelStateInvalid()
                }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}