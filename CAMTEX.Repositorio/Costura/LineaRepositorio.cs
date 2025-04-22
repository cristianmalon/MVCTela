using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class LineaRepositorio : DDataAccess, IGeneralRepositorio<ENLinea>
    {
        public IDictionary<string, object> Actualizar(ENLinea entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdUbicacion", entidad.IdUbicacion);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@Linea", entidad.Linea);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Linea]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENLinea entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdUbicacion", entidad.IdUbicacion);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@Linea", entidad.Linea);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Linea]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENLinea entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdUbicacion", entidad.IdUbicacion);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@Linea", entidad.Linea);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@LinCCod", entidad.LinCCod);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Linea]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENLinea entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_LineaListar]");
            return dt;
        }
        public DataTable ListarActivos(ENLinea entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_LineaListar]");
            return dt;
        }
        public DataTable ListarActivosFromCamtex(ENLinea entidad)
        {
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_LineaListar]");
            return dt;
        }

        public DataTable ListarProveedorActivosFromCamtex(ENProveedor entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Proveedor]");
            return dt;
        }
        public DataTable ListarActivosFromCamtexPrvCamtex(ENLinea entidad)
        {
            oConn.AddParameter("@opcion", 4);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_LineaListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENLinea entidad)
        {
            throw new NotImplementedException();
        }
    }
}
