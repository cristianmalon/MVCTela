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
    public class ParametroRepositorio : DDataAccess, IGeneralRepositorio<Parametro>
    {
        public IDictionary<string, object> Actualizar(Parametro entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(Parametro entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(Parametro entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@Descripcion", entidad.Descripcion);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Parametro]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;
        }

        public DataTable Listar(Parametro entidad)
        {
            oConn.AddParameter("@Query", 1);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_Parametro]");
            return dt;
        }

        public DataTable ListarParametroByMaquina(Cuerda entidad)
        {
            oConn.AddParameter("@Query", 3);
            oConn.AddParameter("@Maquina", entidad.MaqCCod);
            //oConn.AddParameter("@TipoTenidoCodigo", entidad.TipoTenidoCodigo);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);


            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_Cuerdas]");
            return dt;
        }

        public DataTable ListarPaginado(Parametro entidad)
        {
            throw new NotImplementedException();
        }
    }
}
