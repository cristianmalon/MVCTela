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
    public class UnidadMedidaAplicacion : IGeneralAplicacion<UnidadMedida>
    {
        private UnidadMedidaRepositorio UnidadMedidaRepositorio;
        public UnidadMedidaAplicacion(UnidadMedidaRepositorio UnidadMedidaRepositorio)
        {
            this.UnidadMedidaRepositorio = UnidadMedidaRepositorio;
        }

        public Response Actualizar(Request<UnidadMedida> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<UnidadMedida> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<UnidadMedida> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<UnidadMedida>> Listar(Request<UnidadMedida> entidad)
        {
            Response<List<UnidadMedida>> retorno = new Response<List<UnidadMedida>>();
            //throw new NotImplementedException();
            try
            {
                DataTable dt = UnidadMedidaRepositorio.Listar(entidad.entidad);
                List<UnidadMedida> lista = new List<UnidadMedida>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new UnidadMedida()
                    {
                        UnidadMedidaId = Convert.ToInt32(row["UnidadMedidaId"].ToString()),
                        Codigo = row["NombreCorto"] != DBNull.Value ? row["NombreCorto"].ToString() : string.Empty,
                        Descripcion = row["NombreLargo"] != DBNull.Value ? row["NombreLargo"].ToString() : string.Empty,
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

        public Response<List<UnidadMedida>> ListarPaginado(Request<UnidadMedida> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
