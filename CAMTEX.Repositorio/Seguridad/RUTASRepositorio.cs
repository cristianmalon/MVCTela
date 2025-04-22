using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace CAMTEX.Repositorio
{
    public class RUTASRepositorio : DData, IGeneralRepositorio<RUTAS>
    {
        public IDictionary<string, object> Actualizar(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[14];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_ID";
            parametros[0].Value = entidad.RUTAS_ID.Equals(0) ? (long?)null : entidad.RUTAS_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "AREA";
            parametros[1].Value = entidad.AREA;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "CONTROLADOR";
            parametros[2].Value = entidad.CONTROLADOR;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "ACCION";
            parametros[3].Value = entidad.ACCION;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "RUTA";
            parametros[4].Value = entidad.RUTA;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "DESCRIPCION";
            parametros[5].Value = entidad.DESCRIPCION;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "ESTADO";
            parametros[6].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[7] = new SqlParameter();
            parametros[7].ParameterName = "SISTEMA_ID";
            parametros[7].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[8] = new SqlParameter();
            parametros[8].ParameterName = "RUTAS_TIPO_ID";
            parametros[8].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[9] = new SqlParameter();
            parametros[9].ParameterName = "RUTAS_PADRE_ID";
            parametros[9].Value = entidad.RUTAS_PADRE_ID.Equals(null) ? 0 : entidad.RUTAS_PADRE_ID;

            parametros[10] = new SqlParameter();
            parametros[10].ParameterName = "USUARIO_ACT";
            parametros[10].Value = entidad.USUARIO_ACT;

            parametros[11] = new SqlParameter();
            parametros[11].ParameterName = "FECHA_ACT";
            parametros[11].Value = entidad.FECHA_ACT;

            parametros[12] = new SqlParameter();
            parametros[12].ParameterName = "HOST_ACT";
            parametros[12].Value = entidad.HOST_ACT;

            parametros[13] = new SqlParameter();
            parametros[13].ParameterName = "query";
            parametros[13].Value = 2;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Actualizado Ok");

            return retorno;
        }

        public IDictionary<string, object> Eliminar(RUTAS entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[14];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_ID";
            parametros[0].Value = entidad.RUTAS_ID.Equals(0) ? (long?)null : entidad.RUTAS_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "AREA";
            parametros[2].Value = entidad.AREA;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "CONTROLADOR";
            parametros[3].Value = entidad.CONTROLADOR;

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "ACCION";
            parametros[4].Value = entidad.ACCION;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "RUTA";
            parametros[5].Value = entidad.RUTA;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "DESCRIPCION";
            parametros[6].Value = entidad.DESCRIPCION;

            parametros[7] = new SqlParameter();
            parametros[7].ParameterName = "ESTADO";
            parametros[7].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[8] = new SqlParameter();
            parametros[8].ParameterName = "RUTAS_TIPO_ID";
            parametros[8].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[9] = new SqlParameter();
            parametros[9].ParameterName = "RUTAS_PADRE_ID";
            parametros[9].Value = entidad.RUTAS_PADRE_ID.Equals(null) ? 0 : entidad.RUTAS_PADRE_ID;

            parametros[10] = new SqlParameter();
            parametros[10].ParameterName = "USUARIO_REG";
            parametros[10].Value = entidad.USUARIO_REG;

            parametros[11] = new SqlParameter();
            parametros[11].ParameterName = "FECHA_REG";
            parametros[11].Value = entidad.FECHA_REG;

            parametros[12] = new SqlParameter();
            parametros[12].ParameterName = "HOST_REG";
            parametros[12].Value = entidad.HOST_REG;

            parametros[13] = new SqlParameter();
            parametros[13].ParameterName = "query";
            parametros[13].Value = 1;

            var resultado = oConn.ejecutarEscalar("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);

            Dictionary<string, object> retorno = new Dictionary<string, object>();
            retorno.Add("resultado", true);
            retorno.Add("mensaje", "Registro Ok");

            return retorno;
        }

        public DataTable Listar(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[3];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_ID";
            parametros[0].Value = entidad.RUTAS_ID.Equals(0) ? (long?)null : entidad.RUTAS_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());


            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 3;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);

            return dt;
        }

        public DataTable Listar_RutaPadreSistema(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[4];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_ID";
            parametros[0].Value = entidad.RUTAS_ID.Equals(0) ? (long?)null : entidad.RUTAS_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());


            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "SISTEMA_ID";
            parametros[2].Value = entidad.SISTEMA_ID;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "query";
            parametros[3].Value = 3;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);

            return dt;
        }

        public DataTable ListarPaginado(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[7];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTAS_ID";
            parametros[0].Value = entidad.RUTAS_ID.Equals(0) ? (long?)null : entidad.RUTAS_ID;

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "SISTEMA_ID";
            parametros[1].Value = entidad.SISTEMA_ID.Equals(0) ? (long?)null : entidad.SISTEMA_ID;

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "RUTAS_TIPO_ID";
            parametros[2].Value = entidad.RUTAS_TIPO_ID.Equals(0) ? (long?)null : entidad.RUTAS_TIPO_ID;

            parametros[3] = new SqlParameter();
            parametros[3].ParameterName = "ESTADO";
            parametros[3].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[4] = new SqlParameter();
            parametros[4].ParameterName = "query";
            parametros[4].Value = 4;

            parametros[5] = new SqlParameter();
            parametros[5].ParameterName = "PageSize";
            parametros[5].Value = entidad.PageSize;

            parametros[6] = new SqlParameter();
            parametros[6].ParameterName = "PageNumber";
            parametros[6].Value = entidad.PageNumber;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);
            return dt;
        }

        public DataTable ListaRutas(RUTAS entidad)
        {
            IDbDataParameter[] parametros = new IDbDataParameter[3];

            parametros[0] = new SqlParameter();
            parametros[0].ParameterName = "RUTA";
            parametros[0].Value = entidad.RUTA == null ? null : (entidad.RUTA.Trim().Equals(string.Empty) ? null : entidad.RUTA.Trim());

            parametros[1] = new SqlParameter();
            parametros[1].ParameterName = "ESTADO";
            parametros[1].Value = entidad.ESTADO == null ? null : (entidad.ESTADO.Trim().Equals(string.Empty) ? null : entidad.ESTADO.Trim());

            parametros[2] = new SqlParameter();
            parametros[2].ParameterName = "query";
            parametros[2].Value = 5;

            DataTable dt = oConn.ejecutarDataTable("ATA02_ALMACEN.[dbo].[sp_RUTAS]", parametros);

            return dt;
        }


    }
}
