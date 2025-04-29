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
    public class TipoTenidoAplicacion : IGeneralAplicacion<TipoTenido>
    {
        private TipoTenidoRepositorio TipoTenidoRepositorio;
        public TipoTenidoAplicacion(TipoTenidoRepositorio TipoTenidoRepositorio)
        {
            this.TipoTenidoRepositorio = TipoTenidoRepositorio;
        }
        public Response Actualizar(Request<TipoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TipoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TipoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TipoTenido>> Listar(Request<TipoTenido> entidad)
        {
            Response<List<TipoTenido>> retorno = new Response<List<TipoTenido>>();

            try
            {
                DataTable dt = TipoTenidoRepositorio.Listar(entidad.entidad);
                List<TipoTenido> lista = new List<TipoTenido>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new TipoTenido()
                    {
                        TipoTenidoCodigo = row["TTeCCod"] != DBNull.Value ? row["TTeCCod"].ToString() : string.Empty,
                        Descripcion = row["TTeDDes"] != DBNull.Value ? row["TTeDDes"].ToString() : string.Empty,
                        TipoTenidoObservacion = row["TTeDObs"] != DBNull.Value ? row["TTeDObs"].ToString() : string.Empty,
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

        public Response<List<TipoTenido>> ListarPaginado(Request<TipoTenido> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
