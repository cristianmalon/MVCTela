using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class HojaRutaControlRepositorio : DDataAccess, IGeneralRepositorio<E_HojaRutacontrol>
    {
        public IDictionary<string, object> Actualizar( E_HojaRutacontrol entidad ) {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar( E_HojaRutacontrol entidad ) {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar( E_HojaRutacontrol entidad ) {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter( "@HRCID", entidad.HRCID );
            oConn.AddParameter( "@HRCTraCCod", entidad.HRCTraCCod );
            oConn.AddParameter( "@HRCMTC", entidad.HRCMTC );
            oConn.AddParameter( "@HRCLicencia", entidad.HRCLicencia );
            oConn.AddParameter( "@HRCPlaca", entidad.HRCPlaca );
            oConn.AddParameter( "@HRCFecha", entidad.HRCFecha );
            oConn.AddParameter( "@HRCCargaCombustible", entidad.HRCCargaCombustible );
            oConn.AddParameter( "@HRCQGLNS", entidad.HRCQGLNS );
            oConn.AddParameter( "@HRCCosto", entidad.HRCCosto );
            oConn.AddParameter( "@HRCQVueltas", entidad.HRCQVueltas );
            oConn.AddParameter( "@HRCKmInicial", entidad.HRCKmInicial );
            oConn.AddParameter( "@HRCHoraSalida", entidad.HRCHoraSalida );
            oConn.AddParameter( "@HRCUUsuarioLog", entidad.USUARIO_REG );
            oConn.AddParameter( "@HRCWEstacionLog", entidad.HOST_REG );
            oConn.AddParameter( "@XML_HojaRutaControlDetalle", entidad.XML_HojaRutaControlDetalle );

            //var result = oConn.ExecuteNonQuery( "SP_ACTUALIZAR_HOJA_TRABAJO_CONTROL" );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[SP_ACTUALIZAR_HOJA_TRABAJO_CONTROL]" );

            retorno.Add( "resultado", true );
            retorno.Add( "mensaje", "OK" );
            retorno.Add( "HRCID", dt.Rows[0]["HRCID"].ToString() );

            return retorno;
        }

        public DataTable Listar( E_HojaRutacontrol entidad ) {
            oConn.AddParameter( "@Query", 1 );
            oConn.AddParameter( "@HRCPlaca", entidad.HRCPlaca );
            oConn.AddParameter( "@HRCFecha", entidad.HRCFecha );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_HojaRutaControl]" );
            return dt;
        }

        public DataTable ListarPaginado( E_HojaRutacontrol entidad ) {
            throw new NotImplementedException();
        }

        public DataTable ListarTransportista( E_HojaRutacontrol entidad ) {
            oConn.AddParameter( "@Query", 1 );
            oConn.AddParameter( "@TRADDES", entidad.HRCTransportista );
            oConn.AddParameter( "@PageNumber", entidad.PageNumber );
            oConn.AddParameter( "@PageSize", entidad.PageSize );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_Transportista]" );
            return dt;
        }

        public DataTable Listar_HojaRutaControlDetalle( E_HojaRutacontrol entidad ) {
            oConn.AddParameter( "@Query", 1 );
            oConn.AddParameter( "@HRCID", entidad.HRCID );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_HojaRutaControlDetalle]" );
            return dt;
        }
    }
}
