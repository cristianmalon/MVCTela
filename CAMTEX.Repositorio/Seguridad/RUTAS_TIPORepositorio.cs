
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CAMTEX.UtilData;
using CAMTEX.Entidades;

namespace CAMTEX.Repositorio
{
     public class RUTAS_TIPORepositorio : DData, IGeneralRepositorio<RUTAS_TIPO>
    {
        public IDictionary<string, object> Actualizar(RUTAS_TIPO entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[7];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_TIPO_ID";
            parametros[0].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "DESCRIPCION";
            parametros[1].Value = entidad.DESCRIPCION;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "USUARIO_ACT";
            parametros[3].Value = entidad.USUARIO_ACT;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "FECHA_ACT";
            parametros[4].Value = entidad.FECHA_ACT;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "HOST_ACT";
            parametros[5].Value = entidad.HOST_ACT;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "query";
            parametros[6].Value = 2;

            var resultado = oConn.ejecutarEscalar("[dbo].[sp_RUTAS_TIPO]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

        public IDictionary<string, object> Eliminar(RUTAS_TIPO entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(RUTAS_TIPO entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[6];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "DESCRIPCION";
            parametros[0].Value = entidad.DESCRIPCION;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "FECHA_REG";
            parametros[2].Value = entidad.FECHA_REG;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "USUARIO_REG";
            parametros[3].Value = entidad.USUARIO_REG;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "HOST_REG";
            parametros[4].Value = entidad.HOST_REG;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "query";
            parametros[5].Value = 1;

            var resultado = oConn.ejecutarEscalar("[dbo].[sp_RUTAS_TIPO]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Registro Ok");

            return retorno;
        }

        public DataTable Listar(RUTAS_TIPO entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[3];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_TIPO_ID";
            parametros[0].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 3;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_RUTAS_TIPO]", parametros);

            return dt;
        }

        public DataTable ListarPaginado(RUTAS_TIPO entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[5];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_TIPO_ID";
            parametros[0].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 4;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "PageSize";
            parametros[3].Value = entidad.PageSize;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "PageNumber";
            parametros[4].Value = entidad.PageNumber;

            DataTable dt = oConn.ejecutarDataTable("[dbo].[sp_RUTAS_TIPO]", parametros);
            return dt;
        }
    }
}
