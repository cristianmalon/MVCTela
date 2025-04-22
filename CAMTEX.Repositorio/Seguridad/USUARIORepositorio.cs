using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class USUARIORepositorio : DDataAccess, IGeneralRepositorio<ENUsuario>
    {
        public IDictionary<string, object> Actualizar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> UnlogTablet(USUARIO entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Eplccod", entidad.SUsrId);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[usp_UnlogTablet]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }
        public DataTable Login(USUARIO entidad)
        {
            //throw new NotImplementedException();
           
            oConn.AddParameter("@query", 1);
            oConn.AddParameter("@SUsrId", entidad.SUsrId.Trim());
            oConn.AddParameter("@SUsrPsw", entidad.SUsrPsw.Trim());
            oConn.AddParameter("@SUsrSEst", entidad.SUsrSEst);
            DataTable dt = oConn.ExecuteDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO]");
            return dt;
        }

        public DataTable LoginTablet(USUARIO entidad)
        {
            //throw new NotImplementedException();

            oConn.AddParameter("@Eplccod", entidad.SUsrId.Trim());
            oConn.AddParameter("@IPAcceso", entidad.IPAcceso.Trim());
            DataTable dt = oConn.ExecuteDataTable("usp_LoginTablet");
            return dt;
        }

        public DataTable LoginTablet_admin(USUARIO entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("usp_LoginTablet_admin");
            return dt;
        }

        public DataTable Listar(ENUsuario entidad)
        {
            throw new NotImplementedException();
            //IDbDataParameter[] parametros = new IDbDataParameter[4];

            //parametros[0] = new SqlParameter();
            //parametros[0].ParameterName = "SUsrId";
            //parametros[0].Value = entidad.SUsrId.Equals(String.Empty) ? null : entidad.SUsrId.Trim();

            //parametros[1] = new SqlParameter();
            //parametros[1].ParameterName = "CRITERIOFILTRO";
            //parametros[1].Value = entidad.CRITERIOFILTRO == null ? null : (entidad.CRITERIOFILTRO.Trim().Equals(string.Empty) ? null : entidad.CRITERIOFILTRO.Trim());

            //parametros[2] = new SqlParameter();
            //parametros[2].ParameterName = "SUsrSEst";
            //parametros[2].Value = entidad.SUsrSEst == null ? null : (entidad.SUsrSEst.Trim().Equals(string.Empty) ? null : entidad.SUsrSEst.Trim());

            //parametros[3] = new SqlParameter();
            //parametros[3].ParameterName = "query";
            //parametros[3].Value = 2;

            ////DataTable dt = oConn.ejecutarDataTable("[dbo].[sp_ENUsuario]", parametros);
            //DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ENUsuario]", parametros);
            //return dt;
        }

        public DataTable ListarPaginado(ENUsuario entidad)
        {
            throw new NotImplementedException();

            //IDbDataParameter[] parametros = new IDbDataParameter[6];

            //parametros[0] = new SqlParameter();
            //parametros[0].ParameterName = "SUsrId";
            //parametros[0].Value = entidad.SUsrId.Equals(String.Empty) ? null : entidad.SUsrId.Trim();

            //parametros[1] = new SqlParameter();
            //parametros[1].ParameterName = "CRITERIOFILTRO";
            //parametros[1].Value = entidad.CRITERIOFILTRO == null ? null : (entidad.CRITERIOFILTRO.Trim().Equals(string.Empty) ? null : entidad.CRITERIOFILTRO.Trim());

            //parametros[2] = new SqlParameter();
            //parametros[2].ParameterName = "SUsrSEst";
            //parametros[2].Value = entidad.SUsrSEst == null ? null : (entidad.SUsrSEst.Trim().Equals(string.Empty) ? null : entidad.SUsrSEst.Trim());

            //parametros[3] = new SqlParameter();
            //parametros[3].ParameterName = "query";
            //parametros[3].Value = 3;

            //parametros[4] = new SqlParameter();
            //parametros[4].ParameterName = "PageSize";
            //parametros[4].Value = entidad.PageSize;

            //parametros[5] = new SqlParameter();
            //parametros[5].ParameterName = "PageNumber";
            //parametros[5].Value = entidad.PageNumber;

            //DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ENUsuario]", parametros);
            //return dt;
        }
        public DataTable GetUserForLogin(ENUsuario entidad)
        {
            oConn.AddParameter("@query", 1);
            oConn.AddParameter("@SUsrId", entidad.Usuario);
            oConn.AddParameter("@SUsrPsw", entidad.Clave);
            oConn.AddParameter("@SUsrSEst", "A");
            DataTable dt = oConn.ExecuteDataTable("ATA02_ALMACEN.[dbo].[sp_USUARIO]");
            return dt;

        }
        public DataTable GetUserForLoginForgotClave(ENUsuario entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Clave", entidad.Clave);
            DataTable dt = oConn.ExecuteDataTable("ERP.[DBO].[Usp_ListarUsuario]");
            return dt;
        }

        public DataTable GetUser(ENUsuario entidad)
        {
            throw new NotImplementedException();

            //try
            //{
            //    IDbDataParameter[] parametros = new IDbDataParameter[3];

            //    parametros[0] = new SqlParameter();
            //    parametros[0].ParameterName = "EmpCCod";
            //    parametros[0].Value = entidad.EmpCCod;

            //    parametros[1] = new SqlParameter();
            //    parametros[1].ParameterName = "SUsrId";
            //    parametros[1].Value = entidad.SUsrId;

            //    parametros[2] = new SqlParameter();
            //    parametros[2].ParameterName = "query";
            //    parametros[2].Value = 4;

            //    DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ENUsuario]", parametros);

            //    return dt;
            //}
            //catch(Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //    throw ex;
            //}
        }

        public DataTable ListarEmpleado(ENUsuario entidad)
        {
            throw new NotImplementedException();

            //try
            //{
            //    IDbDataParameter[] parametros = new IDbDataParameter[3];

            //    parametros[0] = new SqlParameter();
            //    parametros[0].ParameterName = "EmpCCod";
            //    parametros[0].Value = entidad.EmpCCod;

            //    parametros[1] = new SqlParameter();
            //    parametros[1].ParameterName = "SUsrId";
            //    parametros[1].Value = entidad.SUsrId;

            //    parametros[2] = new SqlParameter();
            //    parametros[2].ParameterName = "query";
            //    parametros[2].Value = 5;

            //    DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ENUsuario]", parametros);

            //    return dt;
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //    throw ex;
            //}
        }

        public DataTable ListarDatoRedireccion(ENUsuario entidad)
        {
            throw new NotImplementedException();

            //try
            //{
            //    IDbDataParameter[] parametros = new IDbDataParameter[3];

            //    parametros[0] = new SqlParameter();
            //    parametros[0].ParameterName = "SISTEMA_ID";
            //    parametros[0].Value = entidad.SISTEMA_ID;

            //    parametros[1] = new SqlParameter();
            //    parametros[1].ParameterName = "SUsrId";
            //    parametros[1].Value = entidad.SUsrId;

            //    parametros[2] = new SqlParameter();
            //    parametros[2].ParameterName = "query";
            //    parametros[2].Value = 6;

            //    DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_ENUsuario]", parametros);

            //    return dt;
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //    throw ex;
            //}
        }
    }
}
