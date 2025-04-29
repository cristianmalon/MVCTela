using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ProduccionCosturaRepositorio : DDataAccess, IGeneralRepositorio<ENProduccionCostura>
    {
        public IDictionary<string, object> Actualizar(ENProduccionCostura entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(ENProduccionCostura entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENProduccionCostura entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ENProduccionCostura entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ENProduccionCostura entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarComboCorte(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@EMPCCOD", entidad.EmpCCod);
            oConn.AddParameter("@COCNTIPOC", entidad.COCNTIPOC);
            oConn.AddParameter("@COCNANIOOC", entidad.anio);
            oConn.AddParameter("@COCNNROOC", entidad.Corte);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_MUESTRA_CORTE_OP_COMBO]");
            return dt;
        }
        public DataTable ListarOperacionesCorte(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@EMPCCOD", entidad.EmpCCod);
            oConn.AddParameter("@COCNTIPOC", entidad.COCNTIPOC);
            oConn.AddParameter("@COCNANIOOC", entidad.anio);
            oConn.AddParameter("@COCNNROOC", entidad.Corte);
            oConn.AddParameter("@HJOOPCTMAQ", entidad.TMICCod);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_MUESTRA_CORTE_OPERACIONES_MAQUINA]");
            return dt;
        }
        public DataTable ListarPaquetesCorte(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@EMPCCOD", entidad.EmpCCod);
            oConn.AddParameter("@COCNTIPOC", entidad.COCNTIPOC);
            oConn.AddParameter("@COCNANIOOC", entidad.anio);
            oConn.AddParameter("@COCNNROOC", entidad.Corte);
            oConn.AddParameter("@HJOOPECOD", entidad.CodOperacion);
          
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_MUESTRA_CORTE_PAQUETES]");
            return dt;
        }
        public DataTable ListarParada(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@IdRpmD01", entidad.IdParada);
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[usp_ParadaListar]");
            return dt;
        }
        public IDictionary<string, object> RegistroParadaNoMecanica(ENParada entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@IdRpmD01", entidad.IdParada);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@IdPmqB01", entidad.IdMaquina);
            oConn.AddParameter("@RpmFIni", entidad.RpmFIni);
            oConn.AddParameter("@RpmNReg", entidad.RpmNReg);
            oConn.AddParameter("@COCCTurIn", entidad.COCCTurIn);
            oConn.AddParameter("@RpmFFin", entidad.RpmFFin);
            oConn.AddParameter("@PrcCCOD", entidad.PrcCCOD);
            oConn.AddParameter("@COCNTipOC", entidad.COCNTipOC);
            oConn.AddParameter("@COCNAnioOC", entidad.COCNAnioOC);
            oConn.AddParameter("@COCNNroOC", entidad.COCNNroOC);
            oConn.AddParameter("@COCNItmPaq", entidad.COCNItmPaq);
            oConn.AddParameter("@COCCCodTal", entidad.COCCCodTal);
            oConn.AddParameter("@IdMotivoParada", entidad.IdMotivoParada);
            oConn.AddParameter("@RpmCPerMan", entidad.RpmCPerMan);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@RpmEstado", entidad.RpmEstado);
            oConn.AddParameter("@RpmCTipFalla", entidad.RpmCTipFalla);
            oConn.AddParameter("@RpmFIniMecanico", entidad.RpmFIniMecanico);
            oConn.AddParameter("@COCEplCCod", entidad.CodMecanico);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[usp_Parada]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("IdParada", dt.Rows[0][0]);
            return retorno;
        }
        public IDictionary<string, object> RegistroPaqueteCorte(ENPaquetes entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", entidad.opcion);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@COCNTIPOC", entidad.COCNTIPOC);
            oConn.AddParameter("@COCNANIOOC", entidad.COCNANIOOC);
            oConn.AddParameter("@COCNNROOC", entidad.COCNNROOC);
            oConn.AddParameter("@COCCCODTAL", entidad.COCCCODTAL);
            oConn.AddParameter("@COCNITMPAQ", entidad.COCNITMPAQ);
            oConn.AddParameter("@HJONOCMB", entidad.HJONOCMB);
            oConn.AddParameter("@HJONITM", entidad.HJONITM);
            oConn.AddParameter("@WFPROCE", entidad.WFPROCE);
            oConn.AddParameter("@WCTRABA", entidad.WCTRABA);
            oConn.AddParameter("@WCLNPRD", entidad.WCLNPRD);
            oConn.AddParameter("@GCUSUAR", entidad.USUARIO_REG);
            oConn.AddParameter("@GWRKST", entidad.HOST_REG);
            oConn.AddParameter("@IDTABLET", entidad.IdTablet);
            oConn.AddParameter("@IDPMQB01", entidad.IdMaquina);
            oConn.AddParameter("@CODESTPROCLEC", entidad.CODESTPROCLEC);
            oConn.AddParameter("@FECINIPROCLEC", entidad.FECINIPROCLEC);
            oConn.AddParameter("@FECFINPROCLEC", entidad.FECFINPROCLEC);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_GUARDA_REGISTRO_PRODUCCION_COSTURA]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }
        public DataTable ListarPersonalMantenimiento(Supervisor entidad)
        {
            oConn.AddOutParameter("@Query", 4);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Supervisor]");
            return dt;
        }

        public DataTable ListarEficiencia(ENEficiencia entidad)
        {
            oConn.AddParameter("@EPLCCOD", entidad.EPLCCOD);
            oConn.AddParameter("@XFECINI", entidad.XFECINI);
            oConn.AddParameter("@XFECFIN", entidad.XFECFIN);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_MUESTRA_EFICIENCIA_TRABAJADOR_COSTURA]");
            return dt;
        }
        public DataTable ListarTicketsLeidos(ENEficiencia entidad)
        {
            oConn.AddParameter("@EPLCCOD", entidad.EPLCCOD);
            oConn.AddParameter("@FECINI", entidad.XFECINI);
            oConn.AddParameter("@FECFIN", entidad.XFECFIN);
            oConn.AddParameter("@EMPCCOD", entidad.EMPCCOD);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_MUESTRA_EFICIENCIA_TRABAJADOR_OPERACION_COSTURA]");
            return dt;
        }

        public DataTable ListarColaDespacho(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ColaDespachados]");
            return dt;
        }

        public DataTable ListarColaDespachoPaginado(ENProduccionCostura entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ColaDespachados]");
            return dt;
        }
    }
}
