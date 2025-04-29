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
    public class TipoTenidoProcesoAplicacion : IGeneralAplicacion<TipoTenidoProceso>
    {
        private TipoTenidoProcesoRepositorio TipoTenidoProcesoRepositorio;
        public TipoTenidoProcesoAplicacion(TipoTenidoProcesoRepositorio TipoTenidoProcesoRepositorio)
        {
            this.TipoTenidoProcesoRepositorio = TipoTenidoProcesoRepositorio;
        }
        public Response Actualizar(Request<TipoTenidoProceso> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TipoTenidoProceso> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TipoTenidoProceso> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoTenidoProcesoRepositorio.Insertar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
                retorno.error = false;
                retorno.Success = true;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<TipoTenidoProceso>> Listar(Request<TipoTenidoProceso> entidad)
        {
            Response<List<TipoTenidoProceso>> retorno = new Response<List<TipoTenidoProceso>>();

            try
            {
                DataTable dt = TipoTenidoProcesoRepositorio.Listar(entidad.entidad);
                List<TipoTenidoProceso> lista = new List<TipoTenidoProceso>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new TipoTenidoProceso()
                    {
                        TipoTenidoProcesoID = int.Parse(row["TipoTenidoProcesoID"].ToString()),
                        ProcesoTenidoID = int.Parse(row["ProcesoTenidoID"].ToString()),

                        TipoTenidoCodigo = row["TTeCCod"] != DBNull.Value ? row["TTeCCod"].ToString() : string.Empty,

                        ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,

                        Descripcion = row["ProcesoDescripcion"] != DBNull.Value ? row["ProcesoDescripcion"].ToString() : string.Empty,

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
        public Response<List<TipoTenidoProceso>> ListarForCrud(Request<TipoTenidoProceso> entidad)
        {
            Response<List<TipoTenidoProceso>> retorno = new Response<List<TipoTenidoProceso>>();

            try
            {
                DataTable dt = TipoTenidoProcesoRepositorio.ListarForCrud(entidad.entidad);
                List<TipoTenidoProceso> lista = new List<TipoTenidoProceso>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new TipoTenidoProceso()
                    {
                        
                        TipoTenidoDescripcion = row["TTeDDes"] != DBNull.Value ? row["TTeDDes"].ToString() : string.Empty,
                        TipoTenidoCodigo = row["TTeCCod"] != DBNull.Value ? row["TTeCCod"].ToString() : string.Empty,
                        
                        EstadoPrevio = int.Parse(row["EstadoPrevio"].ToString()),
                        EstadoTenido = int.Parse(row["EstadoTenido"].ToString()),
                        EstadoLavado = int.Parse(row["EstadoLavado"].ToString()),

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

        public Response<List<TipoTenidoProceso>> ListarPaginado(Request<TipoTenidoProceso> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
