using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class EmpresaRepositorio : DDataAccess, IGeneralRepositorio<ENEmpresa>
    {
        public IDictionary<string, object> Actualizar(ENEmpresa entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdEmpresa", entidad.IdEmpresa);
            oConn.AddParameter("@Empresa", entidad.Empresa);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Empresa]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENEmpresa entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdEmpresa", entidad.IdEmpresa);
            oConn.AddParameter("@Empresa", entidad.Empresa);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Empresa]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENEmpresa entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdEmpresa", entidad.IdEmpresa);
            oConn.AddParameter("@Empresa", entidad.Empresa);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Empresa]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENEmpresa entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_EmpresaListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENEmpresa entidad)
        {
            throw new NotImplementedException();
        }
    }
}
