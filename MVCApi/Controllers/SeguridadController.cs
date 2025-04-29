using CAMTEX.Aplicacion;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace CAMTEX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeguridadController : ControllerBase
    {
        USUARIORepositorio _USUARIORepositorio;
        public SeguridadController()
        {
            var dbUsuario = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")["dbUsuario"];
            var dbPass = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")["dbPass"];
            var dbBD = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")["dbBD"];
            var dbServer = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("AppSettings")["DBSERVER"];
            //var appSettings = configuration.Get("AppSettings"); // null
           // USUARIORepositorio _USUARIORepositorio= new USUARIORepositorio(dbUsuario, dbPass, dbBD, dbServer);

             //_USUARIORepositorio= new USUARIORepositorio(dbUsuario, dbPass, dbBD, dbServer);
        }

        [HttpPost]
        public  Request<List<USUARIO>> LoginUsuario(Request<USUARIO> entidad)
        {
            Request<List<USUARIO>> retorno = new Request<List<USUARIO>>();
           // var ccc = new USUARIORepositorio();
            var prueba = new USUARIOAplicacion(_USUARIORepositorio).Listar(entidad);
            retorno.entidad = prueba.response;

            return retorno;
        }

    }
}
