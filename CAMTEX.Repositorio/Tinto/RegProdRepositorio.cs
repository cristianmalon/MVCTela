using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class RegProdRepositorio : DDataAccess, IGeneralRepositorio<RegProd>
    {
        public IDictionary<string, object> Actualizar(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@FechaInicio", entidad.FechaInicio);
            oConn.AddParameter("@NumRegProd", entidad.NumRegProd);
            oConn.AddParameter("@ProcesoCod", entidad.ProcesoCod);
            oConn.AddParameter("@FechaFin", entidad.FechaFin);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);
            oConn.AddParameter("@CodOperario", entidad.CodOperario);
            oConn.AddParameter("@Observacion", entidad.Observacion);
            oConn.AddParameter("@TotalKilos", entidad.TotalKilos);
            oConn.AddParameter("@TotalRollos", entidad.TotalRollos);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            oConn.AddParameter("@PedidoTextilTipo", entidad.PedidoTextilTipo);
            oConn.AddParameter("@PedidoTextilAnio", entidad.PedidoTextilAnio);
            oConn.AddParameter("@PedidoTextilNro", entidad.PedidoTextilNro);
            oConn.AddParameter("@Color", entidad.Color);
            oConn.AddParameter("@Reproceso", entidad.Reproceso);
            oConn.AddParameter("@Partida", entidad.Partida);
            oConn.AddParameter("@Estacion", entidad.Estacion);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@CodAyudante", entidad.CodAyudante);
            oConn.AddParameter("@Parametros", entidad.Parametros);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_RegistroProduccion]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            return retorno;
        }
        public IDictionary<string, object> ActualizarParametros(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 4);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@FechaInicio", entidad.FechaInicio);
            oConn.AddParameter("@NumRegProd", entidad.NumRegProd);
            oConn.AddParameter("@ProcesoCod", entidad.ProcesoCod);
            oConn.AddParameter("@FechaFin", entidad.FechaFin);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);
            oConn.AddParameter("@CodOperario", entidad.CodOperario);
            oConn.AddParameter("@CodAyudante", entidad.CodAyudante);
            oConn.AddParameter("@Observacion", entidad.Observacion);
            oConn.AddParameter("@TotalKilos", entidad.TotalKilos);
            oConn.AddParameter("@TotalRollos", entidad.TotalRollos);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            oConn.AddParameter("@PedidoTextilTipo", entidad.PedidoTextilTipo);
            oConn.AddParameter("@PedidoTextilAnio", entidad.PedidoTextilAnio);
            oConn.AddParameter("@PedidoTextilNro", entidad.PedidoTextilNro);
            oConn.AddParameter("@Color", entidad.Color);
            oConn.AddParameter("@Reproceso", entidad.Reproceso);
            oConn.AddParameter("@Partida", entidad.Partida);
            oConn.AddParameter("@Estacion", entidad.Estacion);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@Parametros", entidad.Parametros);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_RegistroProduccion]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(RegProd entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@FechaInicio", entidad.FechaInicio);
            oConn.AddParameter("@NumRegProd", entidad.NumRegProd);
            oConn.AddParameter("@ProcesoCod", entidad.ProcesoCod);
            oConn.AddParameter("@FechaFin", entidad.FechaFin);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);
            oConn.AddParameter("@CodOperario", entidad.CodOperario);
            oConn.AddParameter("@Observacion", entidad.Observacion);
            oConn.AddParameter("@TotalKilos", entidad.TotalKilos);
            oConn.AddParameter("@TotalRollos", entidad.TotalRollos);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            oConn.AddParameter("@PedidoTextilTipo", entidad.PedidoTextilTipo);
            oConn.AddParameter("@PedidoTextilAnio", entidad.PedidoTextilAnio);
            oConn.AddParameter("@PedidoTextilNro", entidad.PedidoTextilNro);
            oConn.AddParameter("@Color", entidad.Color);
            oConn.AddParameter("@Reproceso", entidad.Reproceso);
            oConn.AddParameter("@Partida", entidad.Partida);
            oConn.AddParameter("@Estacion", entidad.Estacion);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@CodAyudante", entidad.CodAyudante);
            oConn.AddParameter("@Parametros", entidad.Parametros);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_RegistroProduccion]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            return retorno;
        }

        public IDictionary<string, object> InsertarRegulariza(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@FechaInicio", entidad.FechaInicio);
            oConn.AddParameter("@NumRegProd", entidad.NumRegProd);
            oConn.AddParameter("@ProcesoCod", entidad.ProcesoCod);
            oConn.AddParameter("@FechaFin", entidad.FechaFin);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);
            oConn.AddParameter("@CodOperario", entidad.CodOperario);
            oConn.AddParameter("@Observacion", entidad.Observacion);
            oConn.AddParameter("@TotalKilos", entidad.TotalKilos);
            oConn.AddParameter("@TotalRollos", entidad.TotalRollos);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            oConn.AddParameter("@PedidoTextilTipo", entidad.PedidoTextilTipo);
            oConn.AddParameter("@PedidoTextilAnio", entidad.PedidoTextilAnio);
            oConn.AddParameter("@PedidoTextilNro", entidad.PedidoTextilNro);
            oConn.AddParameter("@Color", entidad.Color);
            oConn.AddParameter("@Reproceso", entidad.Reproceso);
            oConn.AddParameter("@Partida", entidad.Partida);
            oConn.AddParameter("@Estacion", entidad.Estacion);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@CodAyudante", entidad.CodAyudante);
            oConn.AddParameter("@Parametros", entidad.Parametros);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_RegistroProduccionRegulariza]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            return retorno;
        }

        public IDictionary<string, object> InsertarParada(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);
            oConn.AddParameter("@CodOperario", entidad.CodOperario);
            oConn.AddParameter("@Observacion", entidad.Observacion);
            oConn.AddParameter("@Descripcion", entidad.Color);
            oConn.AddParameter("@Estacion", entidad.Estacion);
            oConn.AddParameter("@Usuario", entidad.Usuario);
            oConn.AddParameter("@CodigoMotivo", entidad.CodigoMotivo);
            oConn.AddParameter("@CodigoMotivoEspecifico", entidad.CodigoMotivoEspecifico);
            oConn.AddParameter("@FlagInicioFin", entidad.FlagInicioFin);
            oConn.AddParameter("@CodPersonalMantenimiento", entidad.PersonalMantenimientoCodigo);
            oConn.AddParameter("@FechaInicio_", entidad.FechaInicio);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_RegistroParada]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            return retorno;
        }

        public DataTable InsertarOFPrevio(RegProd entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@CodSupervisor", entidad.CodSupervisor);

            oConn.AddParameter("@ClaveSupervisor", entidad.ClaveSupervisor);
            oConn.AddParameter("@MotivoPrevio", entidad.MotivoPrevio);

            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            //oConn.AddParameter("@@FechaInicio_", entidad.FechaInicio);

            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_OFPrevioInserta]");

            //retorno.Add("resultado", true);
            //retorno.Add("mensaje", "OK");
            //retorno.Add("NroRegistro", dt.Rows[0]["NroRegistro"].ToString());
            //return retorno;
            return dt;
        }

        public DataTable Listar(RegProd entidad)
        {
            throw new NotImplementedException();
        } 
        public DataTable ListarParada(RegProd entidad)
        {
            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            

            DataTable dt = oConn.ExecuteDataTable("dbseg02.[Tinto].[USP_RegistroParada]");
            return dt;
        }
        public DataTable ListarData(RegProd entidad)
        {
            oConn.AddParameter("@Query", 3);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@FechaInicio", entidad.FechaInicio);
            oConn.AddParameter("@FechaFin", entidad.FechaFin);

            DataTable dt = oConn.ExecuteDataTable("dbseg02.[Tinto].[USP_RegistroProduccion]");
            return dt;
        }
        public DataTable ListarPaginado(RegProd entidad)
        {
            throw new NotImplementedException();
        }
    }
}
