using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class TipoTenidoProcesoRepositorio : DDataAccess, IGeneralRepositorio<TipoTenidoProceso>
    {
        public IDictionary<string, object> Actualizar(TipoTenidoProceso entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(TipoTenidoProceso entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(TipoTenidoProceso entidad)
        {
            //oConn.AddParameter("@Query", 2);
            //DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[TipoTenidoProceso]");
            //return dt;

            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@TipoTenidoProcesoID", entidad.TipoTenidoProcesoID);
            oConn.AddParameter("@TTeCCod", entidad.TipoTenidoCodigo);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Maquina", entidad.Estacion);
            oConn.AddParameter("@Cadena", entidad.Cadena);

            //var result = oConn.ExecuteNonQuery( "SP_ACTUALIZAR_HOJA_TRABAJO_CONTROL" );
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[TipoTenidoProceso]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(TipoTenidoProceso entidad)
        {
            oConn.AddParameter("@Query", 1);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[TipoTenidoProceso]");
            return dt;
        }

        public DataTable ListarForCrud(TipoTenidoProceso entidad)
        {
            oConn.AddParameter("@Query", 3);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[TipoTenidoProceso]");
            return dt;
        }

        public DataTable ListarPaginado(TipoTenidoProceso entidad)
        {
            throw new NotImplementedException();
        }
    }
}
