using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class UbicacionAplicacion : IGeneralAplicacion<ENUbicacion>
    {
        private UbicacionRepositorio UbicacionRepositorio;
        public UbicacionAplicacion(UbicacionRepositorio UbicacionRepositorio)
        {
            this.UbicacionRepositorio = UbicacionRepositorio;
        }
        public Response Actualizar(Request<ENUbicacion> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = UbicacionRepositorio.Actualizar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Eliminar(Request<ENUbicacion> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = UbicacionRepositorio.Eliminar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Insertar(Request<ENUbicacion> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = UbicacionRepositorio.Insertar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENUbicacion>> Listar(Request<ENUbicacion> entidad)
        {
            Response<List<ENUbicacion>> retorno = new Response<List<ENUbicacion>>();

            try
            {
                DataTable dt = UbicacionRepositorio.Listar(entidad.entidad);
                List<ENUbicacion> lista = new List<ENUbicacion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENUbicacion()
                    {
                        IdUbicacion = Util.CapturaInt0(row, "IdUbicacion"),
                        Ubicacion = Util.CapturaString(row, "Ubicacion"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),

                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENUbicacion>> ListarPaginado(Request<ENUbicacion> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
