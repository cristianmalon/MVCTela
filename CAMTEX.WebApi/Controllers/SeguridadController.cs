using CAMTEX.Aplicacion;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CAMTEX.WebApi.Controllers
{
    [RoutePrefix("api/Seguridad")]
    public class SeguridadController : ApiController
    {
        [HttpPost]
        [Route("LoginUsuario")]
        public Response<USUARIO> LoginUsuario(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).Login(entidad);
        }

        [HttpPost]
        [Route("ListarSistemas")]
        public Response<List<SISTEMAS>> ListarSistemas(Request<SISTEMAS> entidad)
        {
            return new SISTEMASAplicacion(new SISTEMASRepositorio()).Listar(entidad);
        }
        [HttpPost]
        [Route("ListarDatoRedireccion")]
        public Response<List<USUARIO>> ListarDatoRedireccion(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).ListarDatoRedireccion(entidad);
        }

        [HttpPost]
        [Route("ListarRolesPaginado")]
        public Response<List<ROLES>> ListarRolesPaginado(Request<ROLES> entidad)
        {
            return new ROLESAplicacion(new ROLESRepositorio()).ListarPaginado(entidad);
        }

        [HttpPost]
        [Route("ListarRoles")]
        public Response<List<ROLES>> ListarRoles(Request<ROLES> entidad)
        {
            return new ROLESAplicacion(new ROLESRepositorio()).Listar(entidad);
        }

        [HttpPost]
        [Route("InsertarRol")]
        public Response InsertarRol(Request<ROLES> entidad)
        {
            return new ROLESAplicacion(new ROLESRepositorio()).Insertar(entidad);
        }

        [HttpPost]
        [Route("ActualizarRol")]
        public Response ActualizarRol(Request<ROLES> entidad)
        {
            return new ROLESAplicacion(new ROLESRepositorio()).Actualizar(entidad);
        }

        [HttpPost]
        [Route("GetUser")]
        public Response<List<USUARIO>> GetUser(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).GetUser(entidad);
        }

        [HttpPost]
        [Route("ListarEmpleado")]
        public Response<List<USUARIO>> ListarEmpleado(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).ListarEmpleado(entidad);
        }

        [HttpPost]
        [Route("ListarUsuariosPaginado")]
        public Response<List<USUARIO>> ListarUsuariosPaginado(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).ListarPaginado(entidad);
        }

        [HttpPost]
        [Route("ListarUsuarios")]
        public Response<List<USUARIO>> ListarUsuarios(Request<USUARIO> entidad)
        {
            return new USUARIOAplicacion(new USUARIORepositorio()).Listar(entidad);
        }
        [HttpPost]
        [Route("ListarRutas_Tipo")]
        public Response<List<RUTAS_TIPO>> ListarRutas_Tipo(Request<RUTAS_TIPO> entidad)
        {
            return new RUTAS_TIPOAplicacion(new RUTAS_TIPORepositorio()).Listar(entidad);
        }

        [HttpPost]
        [Route("ListarRutasPaginado")]
        public Response<List<RUTAS>> ListarRutasPaginado(Request<RUTAS> entidad)
        {
            return new RUTASAplicacion(new RUTASRepositorio()).ListarPaginado(entidad);
        }

        [HttpPost]
        [Route("ListarRutas")]
        public Response<List<RUTAS>> ListarRutas(Request<RUTAS> entidad)
        {
            return new RUTASAplicacion(new RUTASRepositorio()).Listar(entidad);
        }

        [HttpPost]
        [Route("Listar_RutaPadreSistema")]
        public Response<List<RUTAS>> Listar_RutaPadreSistema(Request<RUTAS> entidad)
        {
            return new RUTASAplicacion(new RUTASRepositorio()).Listar_RutaPadreSistema(entidad);
        }

        [HttpPost]
        [Route("InsertarRuta")]
        public Response InsertarRuta(Request<RUTAS> entidad)
        {
            return new RUTASAplicacion(new RUTASRepositorio()).Insertar(entidad);
        }

        [HttpPost]
        [Route("ActualizarRuta")]
        public Response ActualizarRuta(Request<RUTAS> entidad)
        {
            return new RUTASAplicacion(new RUTASRepositorio()).Actualizar(entidad);
        }
        [HttpPost]
        [Route("ListarRoles_RutasPaginado")]
        public Response<List<ROLES_RUTAS>> ListarRoles_RutasPaginado(Request<ROLES_RUTAS> entidad)
        {
            return new ROLES_RUTASAplicacion(new ROLES_RUTASRepositorio()).ListarPaginado(entidad);
        }
        [HttpPost]
        [Route("ListarRoles_Rutas")]
        public Response<List<ROLES_RUTAS>> ListarRoles_Rutas(Request<ROLES_RUTAS> entidad)
        {
            return new ROLES_RUTASAplicacion(new ROLES_RUTASRepositorio()).Listar(entidad);
        }
        [HttpPost]
        [Route("DesactivarRutas")]
        public Response DesactivarRutas(Request<ROLES_RUTAS> entidad)
        {
            return new ROLES_RUTASAplicacion(new ROLES_RUTASRepositorio()).DesactivarRutas(entidad);
        }
        [HttpPost]
        [Route("ActualizarRoles_Rutas")]
        public Response ActualizarRoles_Rutas(Request<ROLES_RUTAS> entidad)
        {
            return new ROLES_RUTASAplicacion(new ROLES_RUTASRepositorio()).Actualizar(entidad);
        }

        [HttpPost]
        [Route("ListarUsuario_RolesPaginado")]
        public Response<List<USUARIO_ROLES>> ListarUsuario_RolesPaginado(Request<USUARIO_ROLES> entidad)
        {
            return new USUARIO_ROLESAplicacion(new USUARIO_ROLESRepositorio()).ListarPaginado(entidad);
        }

        [HttpPost]
        [Route("ListarRolesSistema_Usuario")]
        public Response<List<USUARIO_ROLES>> ListarRolesSistema_Usuario(Request<USUARIO_ROLES> entidad)
        {
            return new USUARIO_ROLESAplicacion(new USUARIO_ROLESRepositorio()).ListarRolesSistema_Usuario(entidad);
        }
        [HttpPost]
        [Route("DesactivarRoles")]
        public Response DesactivarRoles(Request<USUARIO_ROLES> entidad)
        {
            return new USUARIO_ROLESAplicacion(new USUARIO_ROLESRepositorio()).DesactivarRoles(entidad);
        }
        [HttpPost]
        [Route("ActualizarUsuario_Roles")]
        public Response ActualizarUsuario_Roles(Request<USUARIO_ROLES> entidad)
        {
            return new USUARIO_ROLESAplicacion(new USUARIO_ROLESRepositorio()).Actualizar(entidad);
        }

        [HttpPost]
        [Route("ActualizarSistemas")]
        public Response ActualizarSistemas(Request<SISTEMAS> entidad)
        {
            return new SISTEMASAplicacion(new SISTEMASRepositorio()).Actualizar(entidad);
        }

        [HttpPost]
        [Route("InsertarSistemas")]
        public Response InsertarSistemas(Request<SISTEMAS> entidad)
        {
            return new SISTEMASAplicacion(new SISTEMASRepositorio()).Insertar(entidad);
        }

        [HttpPost]
        [Route("ListarsistemaPaginado")]
        public Response<List<SISTEMAS>> ListarsistemaPaginado(Request<SISTEMAS> entidad)
        {
            return new SISTEMASAplicacion(new SISTEMASRepositorio()).ListarPaginado(entidad);
        }

        [HttpPost]
        [Route("ListarSistemaID")]
        public Response<List<SISTEMAS>> ListarSistema(Request<SISTEMAS> entidad)
        {
            return new SISTEMASAplicacion(new SISTEMASRepositorio()).ListarSistema(entidad);
        }
    }


}
