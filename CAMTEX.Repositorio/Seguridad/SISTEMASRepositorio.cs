using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace CAMTEX.Repositorio
{
    public class SISTEMASRepositorio : DData, IGeneralRepositorio<SISTEMAS>
    {
        public IDictionary<string, object> Actualizar(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[7];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "DESCRIPCION";
            parametros[0].Value = entidad.DESCRIPCION;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "DESCRIPCION_CORTA";
            parametros[1].Value = entidad.DESCRIPCION_CORTA;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 3;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "SISTEMA_ID";
            parametros[3].Value = entidad.SISTEMA_ID;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "RUTA_URL";
            parametros[4].Value = entidad.RUTA_URL;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "ICONO";
            parametros[5].Value = entidad.ICONO;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "COLOR";
            parametros[6].Value = entidad.COLOR;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

        public IDictionary<string, object> Eliminar(SISTEMAS entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[6];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "DESCRIPCION";
            parametros[0].Value = entidad.DESCRIPCION;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "DESCRIPCION_CORTA";
            parametros[1].Value = entidad.DESCRIPCION_CORTA;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 2;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "COLOR";
            parametros[3].Value = entidad.COLOR;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "RUTA_URL";
            parametros[4].Value = entidad.RUTA_URL;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "ICONO";
            parametros[5].Value = entidad.ICONO;

           

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

        public DataTable Listar(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[1];
            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "query";
            parametros[0].Value = 1;

           
            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);

            return dt;
        }
        public DataTable ListarSistema(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[2];
            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "query";
            parametros[0].Value = 4;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);

            return dt;
        }

        public DataTable ListarPaginado(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[3];

          
            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "query";
            parametros[0].Value = 5;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "PageSize";
            parametros[1].Value = entidad.PageSize;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "PageNumber";
            parametros[2].Value = entidad.PageNumber;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);
            return dt;
        }

        public DataTable ListarSistemasUsuario(SISTEMAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[2];
            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "query";
            parametros[0].Value = 6;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "MUSUCONST";
            parametros[1].Value = entidad.SUsrId;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_SISTEMAS]", parametros);

            return dt;
        }
    }
}
