using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CAMTEX.Repositorio
{
    public class USUARIO_ROLESRepositorio : DData, IGeneralRepositorio<USUARIO_ROLES>
    {
        public IDictionary<string, object> Actualizar(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[10];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ROLES_ID";
            parametros[1].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "USUARIO_REG";
            parametros[3].Value = entidad.USUARIO_REG;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "FECHA_REG";
            parametros[4].Value = entidad.FECHA_REG;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "HOST_REG";
            parametros[5].Value = entidad.HOST_REG;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "USUARIO_ACT";
            parametros[6].Value = entidad.USUARIO_ACT;

            parametros[7] = new SqlParameter();
            parametros[7].ParameterName = "FECHA_ACT";
            parametros[7].Value = entidad.FECHA_ACT;

            parametros[8] = new SqlParameter();
            parametros[8].ParameterName = "HOST_ACT";
            parametros[8].Value = entidad.HOST_ACT;

            parametros[9] = new SqlParameter();
            parametros[9].ParameterName = "query";
            parametros[9].Value = 2;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Registro Ok");

            return retorno;
        }

        public IDictionary<string, object> Eliminar(USUARIO_ROLES entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[7];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ROLES_ID";
            parametros[1].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "USUARIO_REG";
            parametros[3].Value = entidad.USUARIO_REG;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "FECHA_REG";
            parametros[4].Value = entidad.FECHA_REG;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "HOST_REG";
            parametros[5].Value = entidad.HOST_REG;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "query";
            parametros[6].Value = 1;

            var resultado = oConn.ejecutarEscalar("[dbo].[sp_USUARIO_ROLES]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Registro Ok");

            return retorno;
        }

        public DataTable Listar(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[4];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ROLES_ID";
            parametros[1].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "query";
            parametros[3].Value = 3;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);

            return dt;
        }

        public DataTable ListarActivos(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[5];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ROLES_ID";
            parametros[1].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "SISTEMA_ID";
            parametros[3].Value = entidad.SISTEMA_ID;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "query";
            parametros[4].Value = 7;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);

            return dt;
        }
        public DataTable ListarRolesSistema_Usuario(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[4];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value =  entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "ESTADO";
            parametros[2].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "query";
            parametros[3].Value = 6;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);

            return dt;
        }

        public DataTable ListarPaginado(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[6];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ROLES_ID";
            parametros[1].Value = entidad.ROLES_ID.Equals(0) ? (long?)null : entidad.ROLES_ID;

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

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);
            return dt;
        }

        public IDictionary<string, object> DesactivarRoles(USUARIO_ROLES entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[6];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "MUSUCONST";
            parametros[0].Value = entidad.MUSUCONST == null ? null : (entidad.MUSUCONST.Trim().Equals(string.Empty) ? null : entidad.MUSUCONST.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "USUARIO_ACT";
            parametros[1].Value = entidad.USUARIO_ACT;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "FECHA_ACT";
            parametros[2].Value = entidad.FECHA_ACT;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "HOST_ACT";
            parametros[3].Value = entidad.HOST_ACT;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "SISTEMA_ID";
            parametros[4].Value = entidad.SISTEMA_ID;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "query";
            parametros[5].Value = 5;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_USUARIO_ROLES]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

    }
}
