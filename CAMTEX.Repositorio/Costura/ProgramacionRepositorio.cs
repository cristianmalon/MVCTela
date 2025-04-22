using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ProgramacionRepositorio : DDataAccess, IGeneralRepositorio<ENProgramacion>
    {
        public IDictionary<string, object> Actualizar(ENProgramacion entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(ENProgramacion entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENProgramacion entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ENProgramacion entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ENProgramacion entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPlanCuotas(ENProgramacion entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@TipoOP", entidad.dcpctoc);
            oConn.AddParameter("@AnioOP", entidad.dcpnaop);
            oConn.AddParameter("@NroOP", entidad.dcpnnop);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ProgramacionPlanCuotas]");
            return dt;
        }
        public DataTable ListarOrdenProduccion(ENOrdenProduccion entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@TipoOP", entidad.TipoOP);
            oConn.AddParameter("@AnioOP", entidad.AnioOP);
            oConn.AddParameter("@NroOP", entidad.NroOP);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_OrdenProduccionListar]");
            return dt;
        }
        public DataTable GetOrdenProduccionById(ENOrdenProduccion entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@TipoOP", entidad.TipoOP);
            oConn.AddParameter("@AnioOP", entidad.AnioOP);
            oConn.AddParameter("@NroOP", entidad.NroOP);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_OrdenProduccionListar]");
            return dt;
        }

        public DataTable ListarProgamacionxCombo(ENProgramacion entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@TipoOP", entidad.dcpctoc);
            oConn.AddParameter("@AnioOP", entidad.dcpnaop);
            oConn.AddParameter("@NroOP", entidad.dcpnnop);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ProgramacionPlanCuotas]");
            return dt;
        }

        public IDictionary<string, object> AsignaLineaxCombo(ENProgramacion entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {

                oConn.AddParameter("@opcion", 1);
                oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
                oConn.AddParameter("@DCPCTOC", entidad.dcpctoc);
                oConn.AddParameter("@DCPNAOP", entidad.dcpnaop);
                oConn.AddParameter("@DCPNNOP", entidad.dcpnnop);
                oConn.AddParameter("@DCPNCmbOP", entidad.dcpncmbop);
                oConn.AddParameter("@OPCNItemD", entidad.OPCNItemD);
                oConn.AddParameter("@IdOPED02", entidad.IdOPED02);

                oConn.AddParameter("@IdProveedor", entidad.IdProveedor);
                oConn.AddParameter("@IdLinea", entidad.IdLinea);
                oConn.AddParameter("@PlantaServicio", entidad.PlantaServicio);
                oConn.AddParameter("@Orden", entidad.Orden);
                oConn.AddParameter("@Orden2", entidad.Orden2);
                oConn.AddParameter("@TipoComboDcpo", entidad.TipoComboDcpo);
                oConn.AddParameter("@UsuarioCreacion", entidad.USUARIO_REG);
                oConn.AddParameter("@MaquinaCreacion", entidad.HOST_REG);


                var resultado = oConn.ExecuteNonQuery("USP_ProgramacionAsignacionLinea");

                retorno.Add("resultado", resultado);
                if (resultado > 0)
                {
                    retorno.Add("mensaje", "Registro Ok");
                }
                else
                {
                    retorno.Add("mensaje", "Problemas al procesar el Registro");
                }
                return retorno;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public IDictionary<string, object> AsignaLineaxComboProcesa(ENProgramacion entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {

                oConn.AddParameter("@opcion", 3);
                oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
                oConn.AddParameter("@DCPCTOC", entidad.dcpctoc);
                oConn.AddParameter("@DCPNAOP", entidad.dcpnaop);
                oConn.AddParameter("@DCPNNOP", entidad.dcpnnop);
                oConn.AddParameter("@DCPNCmbOP", entidad.dcpncmbop);
                oConn.AddParameter("@OPCNItemD", entidad.OPCNItemD);
                oConn.AddParameter("@IdOPED02", entidad.IdOPED02);

                oConn.AddParameter("@IdProveedor", entidad.IdProveedor);
                oConn.AddParameter("@IdLinea", entidad.IdLinea);
                oConn.AddParameter("@PlantaServicio", entidad.PlantaServicio);
                oConn.AddParameter("@Orden", entidad.Orden);
                oConn.AddParameter("@Orden2", entidad.Orden2);
                oConn.AddParameter("@TipoComboDcpo", entidad.TipoComboDcpo);
                oConn.AddParameter("@UsuarioCreacion", entidad.USUARIO_REG);
                oConn.AddParameter("@MaquinaCreacion", entidad.HOST_REG);


                var resultado = oConn.ExecuteNonQuery("USP_ProgramacionAsignacionLinea");

                retorno.Add("resultado", resultado);
                if (resultado > 0)
                {
                    retorno.Add("mensaje", "Registro Ok");
                }
                else
                {
                    retorno.Add("mensaje", "Problemas al procesar el Registro");
                }
                return retorno;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
