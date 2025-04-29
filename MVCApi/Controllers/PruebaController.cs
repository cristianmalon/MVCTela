using CAMTEX.Aplicacion;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAMTEX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PruebaController : ControllerBase
    {
        [HttpPost]
        public Request<ROLES> ListarRoles(Request<ROLES> entidad)
        {
          //  var prueba = new ROLESAplicacion(new ROLESRepositorio()).Listar(entidad);

            return entidad;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        //[HttpGet]
        //public int prueba(string ab)
        //{
        //    return 123;
        //}
    }

}
