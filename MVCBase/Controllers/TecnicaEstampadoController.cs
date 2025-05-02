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
    public class TecnicaEstampadoController : Controller
    {
        // GET: TecnicaEstampado
        public ActionResult Index()
        {
            return View();
        }






        [HttpGet]
        [AllowAnonymous]
        public JsonResult ListarTecnicaEst_all()
        {
            var datos = new Request<TECB01>();
            datos.entidad = new TECB01();
            var lista = new TECB01Aplicacion(new TECB01Repositorio()).ListarPaginado(datos);
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
        public JsonResult InsertTecnicaEst(TECB01 entidad)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    Response response = new Response();
                    var datos = new Request<TECB01>();
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    datos.entidad = entidad;
                    response = new TECB01Aplicacion(new TECB01Repositorio()).Insertar(datos);

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
        public JsonResult UpdateTecnicaEst(TECB01 entidad)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Response response = new Response();
                    var datos = new Request<TECB01>();
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    datos.entidad = entidad;
                    response = new TECB01Aplicacion(new TECB01Repositorio()).Actualizar(datos);

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
        public JsonResult DeleteTecnicaEst(TECB01 entidad)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Response response = new Response();
                    var datos = new Request<TECB01>();
                    datos.entidad = entidad;
                    entidad.USUARIO_REG = VariablesWeb.Usuario.SUsrId;
                    entidad.HOST_REG = VariablesWeb.HostName();
                    response = new TECB01Aplicacion(new TECB01Repositorio()).Eliminar(datos);

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