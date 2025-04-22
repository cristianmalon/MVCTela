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
    public class ConfigParametrosRepositorio : DDataAccess, IGeneralRepositorio<ConfigParametros>
    {
        public IDictionary<string, object> Actualizar(ConfigParametros entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@configUM", entidad.ConfigUM);
            oConn.AddParameter("@configCeldas", entidad.ConfigCeldas);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Estacion", entidad.HOST_REG);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_PDA_PRO_MOTIVOSADICIONALES]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;

        }
        public IDictionary<string, object> ActualizarRangos(ParametroMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@IDPRMM02", entidad.IDPRMM02);
            oConn.AddParameter("@Marcado", entidad.Marcado);
            oConn.AddParameter("@Obligatorio", entidad.Obligatorio);
            oConn.AddParameter("@Rango", entidad.Rango);
            oConn.AddParameter("@RangoMin", entidad.RangoMin);
            oConn.AddParameter("@RangoMax", entidad.RangoMax);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Orden", entidad.Orden);
            oConn.AddParameter("@Estacion", entidad.Estacion);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_ParametroRangoMaquinaUpd]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;

        }
        public IDictionary<string, object> PreActualizarRangosMasivo(ParametroMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 3);
            oConn.AddParameter("@IDPRMM02", entidad.IDPRMM02);
            oConn.AddParameter("@Marcado", entidad.Marcado);
            oConn.AddParameter("@Obligatorio", entidad.Obligatorio);
            oConn.AddParameter("@Rango", entidad.Rango);
            oConn.AddParameter("@RangoMin", entidad.RangoMin);
            oConn.AddParameter("@RangoMax", entidad.RangoMax);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Estacion", entidad.Estacion);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_ParametroRangoMaquinaUpd]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;

        }

        public IDictionary<string, object> CopiarConfiguracion(ParametroMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@MaquinaDestino", entidad.MaquinaDestino);
            
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Estacion", entidad.Estacion);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_ParametroRangoMaquinaUpd]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;

        }

        public IDictionary<string, object> Eliminar(ConfigParametros entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ConfigParametros entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@configUM", entidad.ConfigUM);
            oConn.AddParameter("@configCeldas", entidad.ConfigCeldas);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Estacion", entidad.HOST_REG);
            oConn.AddParameter("@Maquina", entidad.MaqCCod);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_ParametroMaquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("MOTId", dt.Rows[0]["MOTId"].ToString());
            return retorno;
        }

        public DataTable Listar(ConfigParametros entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarParametroMaquina(ConfigParametros entidad)
        {
            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@MaqCCod", entidad.MaqCCod);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_ParametroMaquinaListar]");
            return dt;
        }

        public DataTable ListarParametros(Parametro entidad)
        {
            oConn.AddParameter("@Query", 3);
            oConn.AddParameter("@MaqCCod", entidad.MaqCCod);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_ParametroMaquinaListar]");
            return dt;
        }
        public DataTable ListarParametroMaquinaForRango(ConfigParametros entidad)
        {
            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@MaqCCod", entidad.MaqCCod);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_ParametroMaquinaListar]");
            return dt;
        }

        public DataTable ListarPaginado(ConfigParametros entidad)
        {
            throw new NotImplementedException();
        }
    }
}
