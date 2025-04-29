using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using CAMTEX.UtilGeneral;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class USUARIO_ACCESOAplicacion : IGeneralAplicacion<USUARIO_ACCESO>
    {
        private USUARIO_ACCESORepositorio USUARIO_ACCESORepositorio;
        public USUARIO_ACCESOAplicacion(USUARIO_ACCESORepositorio USUARIO_ACCESORepositorio)
        {
            this.USUARIO_ACCESORepositorio = USUARIO_ACCESORepositorio;
        }
        public Response Actualizar(Request<USUARIO_ACCESO> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<USUARIO_ACCESO> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<USUARIO_ACCESO> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<USUARIO_ACCESO>> Listar(Request<USUARIO_ACCESO> entidad)
        {
            Response<List<USUARIO_ACCESO>> retorno = new Response<List<USUARIO_ACCESO>>();

            try
            {
                DataTable dt = USUARIO_ACCESORepositorio.Listar(entidad.entidad);
                List<USUARIO_ACCESO> lista = new List<USUARIO_ACCESO>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new USUARIO_ACCESO()
                    {
                        SEvnId = row["SEvnId"] != DBNull.Value ? row["SEvnId"].ToString() : string.Empty,
                        SSisId = row["SSisId"] != DBNull.Value ? row["SSisId"].ToString() : string.Empty,
                        SPgmId = row["SPgmId"] != DBNull.Value ? row["SPgmId"].ToString() : string.Empty,

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

        public Response<List<USUARIO_ACCESO>> ListarPaginado(Request<USUARIO_ACCESO> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
