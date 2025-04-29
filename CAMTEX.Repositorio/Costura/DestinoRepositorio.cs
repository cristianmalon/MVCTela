using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class DestinoRepositorio : DDataAccess, IGeneralRepositorio<ENDestino>
    {
        public IDictionary<string, object> Actualizar(ENDestino entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdDestino", entidad.IdDestino);
            oConn.AddParameter("@Destino", entidad.Destino);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Destino]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENDestino entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdDestino", entidad.IdDestino);
            oConn.AddParameter("@Destino", entidad.Destino);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Destino]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENDestino entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdDestino", entidad.IdDestino);
            oConn.AddParameter("@Destino", entidad.Destino);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Destino]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENDestino entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_DestinoListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENDestino entidad)
        {
            throw new NotImplementedException();
        }
    }
}
