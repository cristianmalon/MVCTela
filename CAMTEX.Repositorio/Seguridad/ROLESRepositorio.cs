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
    public class ROLESRepositorio : DData, IGeneralRepositorio<ROLES>
    {
        public IDictionary<string, object> Actualizar(ROLES entidad)
        {

            IDbDataParameter[] parametros = new IDbDataParameter[8];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "ROLES_ID";
            parametros[0].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "DESCRIPCION";
            parametros[2].Value = entidad.DESCRIPCION;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "ESTADO";
            parametros[3].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "USUARIO_ACT";
            parametros[4].Value = entidad.USUARIO_ACT;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "FECHA_ACT";
            parametros[5].Value = entidad.FECHA_ACT;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "HOST_ACT";
            parametros[6].Value = entidad.HOST_ACT;

            parametros[7] = new SqlParameter();
            parametros[7].ParameterName = "query";
            parametros[7].Value = 2;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_ROLES]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

        public IDictionary<string, object> Eliminar(ROLES entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[8];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "ROLES_ID";
            parametros[0].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "DESCRIPCION";
            parametros[2].Value = entidad.DESCRIPCION;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "ESTADO";
            parametros[3].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "USUARIO_REG";
            parametros[4].Value = entidad.USUARIO_REG;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "FECHA_REG";
            parametros[5].Value = entidad.FECHA_REG;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "HOST_REG";
            parametros[6].Value = entidad.HOST_REG;

            parametros[7] = new SqlParameter();
            parametros[7].ParameterName = "query";
            parametros[7].Value = 1;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_ROLES]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Registro Ok");

            return retorno;
        }

        public DataTable Listar(ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[4];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "ROLES_ID";
            parametros[0].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "query";
            parametros[3].Value = 3;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ROLES]", parametros);

            return dt;
        }

        public DataTable ListarPaginado(ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[6];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "ROLES_ID";
            parametros[0].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "query";
            parametros[3].Value = 4;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "PageSize";
            parametros[4].Value = entidad.PageSize;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "PageNumber";
            parametros[5].Value = entidad.PageNumber;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ROLES]", parametros);
            return dt;
        }
    }
}
