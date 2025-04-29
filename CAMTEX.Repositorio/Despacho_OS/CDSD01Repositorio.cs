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
    public class CDSD01Repositorio : DDataAccess, IGeneralRepositorio<E_CDSD01>
    {
        public IDictionary<string, object> Actualizar( E_CDSD01 entidad ) {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar( E_CDSD01 entidad ) {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar( E_CDSD01 entidad ) {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter( "@EmpCCod", entidad.EmpCCod );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@DGRNITM", entidad.DGRNITM );
            oConn.AddParameter( "@XML_Etiquetas", entidad.XML_Etiquetas );
            oConn.AddParameter( "@USUARIO", entidad.USUARIO_REG );
            oConn.AddParameter( "@ESTACION", entidad.HOST_REG );
            oConn.AddParameter( "@LGRCPROVEEDOR", entidad.LGRCPROVEEDOR );
            var result = oConn.ExecuteNonQuery( "sp_registrar_guia_control_Despacho" );

            retorno.Add( "resultado", true );
            retorno.Add( "mensaje", "OK" );

            return retorno;

        }

        public IDictionary<string, object> Generar_Despacho_Placa( E_CDSD01 entidad ) {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter( "@GuiDPlaca", entidad.Placa );
            var result = oConn.ExecuteNonQuery( "USP_GENERA_DESPACHO_OS_PLACA" );

            retorno.Add( "resultado", true );
            retorno.Add( "mensaje", "OK" );

            return retorno;

        }

        public IDictionary<string, object> InsertarDestino( E_CDSD01 entidad ) {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter( "@EmpCCod", entidad.EmpCCod );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@DGRNITM", entidad.DGRNITM );
            oConn.AddParameter( "@XML_Etiquetas", entidad.XML_Etiquetas );
            oConn.AddParameter( "@USUARIO", entidad.USUARIO_REG );
            oConn.AddParameter( "@ESTACION", entidad.HOST_REG );
            var result = oConn.ExecuteNonQuery( "sp_registrar_guia_control_Destino" );

            retorno.Add( "resultado", true );
            retorno.Add( "mensaje", "OK" );

            return retorno;

        }

        public DataTable Listar( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 1 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@LGRCPROVEEDOR", entidad.LGRCPROVEEDOR );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public DataTable ListarDestino( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 4 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@LGRCPROVEEDOR", entidad.LGRCPROVEEDOR );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public IDictionary<string, object> ListarPlaca( E_CDSD01 entidad ) {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter( "@DISIP", entidad.IP );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[USP_SEL_PLACA]" );

            retorno.Add( "resultado", true );
            retorno.Add( "Placa", dt.Rows[0][0].ToString() );

            return retorno;

        }

        public DataTable ListarDetalle( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 2 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@LGRCPROVEEDOR", entidad.LGRCPROVEEDOR );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public DataTable ListarDetalleDestino( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 3 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@DGRNANO", entidad.DGRNANO );
            oConn.AddParameter( "@DGRNNRO", entidad.DGRNNRO );
            oConn.AddParameter( "@LGRCPROVEEDOR", entidad.LGRCPROVEEDOR );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public DataTable ListarPaginado( E_CDSD01 entidad ) {

            oConn.AddParameter( "@Query", 1 );
            oConn.AddParameter( "@CdsNSerieGuia", entidad.CdsNSerieGuia );
            oConn.AddParameter( "@CdsCProv", entidad.CdsCProv );
            oConn.AddParameter( "@PageNumber", entidad.PageNumber );
            oConn.AddParameter( "@PageSize", entidad.PageSize );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[SP_CONTDES_CDSD01_LISTAR]" );
            return dt;
        }


        public DataTable ListarAyuda( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 5 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@LGRDPROVEEDOR", entidad.LGRDPROVEEDOR );
            oConn.AddParameter( "@PageNumber", entidad.PageNumber );
            oConn.AddParameter( "@PageSize", entidad.PageSize );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public DataTable ListarAyudadestino( E_CDSD01 entidad ) {
            oConn.AddParameter( "@Query", 6 );
            oConn.AddParameter( "@DGRDPLACA", entidad.Placa );
            oConn.AddParameter( "@LGRDPROVEEDOR", entidad.LGRDPROVEEDOR );
            oConn.AddParameter( "@PageNumber", entidad.PageNumber );
            oConn.AddParameter( "@PageSize", entidad.PageSize );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_control_Despacho]" );
            return dt;
        }

        public DataTable Listar_Reporte_Despacho( E_CDSD01 entidad ) {
            oConn.AddParameter( "@FechaInicial", entidad.FechaInicio );
            oConn.AddParameter( "@FechaFinal", entidad.FechaFin );
            DataTable dt = oConn.ExecuteDataTable( "[dbo].[sp_Listar_Reporte_Despacho]" );
            return dt;
        }
    }
}
